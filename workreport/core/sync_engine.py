import time
import re
from typing import List, Dict, Any, Set, Tuple, Optional
from core.faro_client import FaroClient
from core.state_manager import StateManager

class SyncEngine:
    """
    Engine to reconcile local report tasks with Faro tasks,
    filter by selected dates, detect duplicates on Faro, and execute sync.
    """

    def __init__(self, faro_client: Optional[FaroClient] = None, state_manager: Optional[StateManager] = None):
        self.faro_client = faro_client
        self.state_manager = state_manager or StateManager()

    @staticmethod
    def normalize_title(title: str) -> str:
        """Removes common prefixes, extra whitespace and lowercases for comparison."""
        t = re.sub(r'^(?:عنوان(?:\s+تست\s+چالش)?:\s*)', '', title.strip())
        t = re.sub(r'\s+', ' ', t).strip().lower()
        return t

    def fetch_existing_faro_titles_and_ids(self, board_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Fetches tasks from Faro to check for duplicates directly on the platform.
        Returns a dictionary mapping normalized titles to task details.
        """
        existing_map = {}
        if not self.faro_client:
            return existing_map

        tasks_list = []
        if board_id:
            tasks_list = self.faro_client.get_board_tasks(board_id)
        
        # If board tasks empty or no board, also check feed
        if not tasks_list:
            tasks_list = self.faro_client.get_feed_tasks()

        for item in tasks_list:
            raw_title = item.get("title") or item.get("name") or ""
            norm_title = self.normalize_title(raw_title)
            if norm_title:
                existing_map[norm_title] = {
                    "id": item.get("id"),
                    "title": raw_title,
                    "column": item.get("column") or item.get("column_id"),
                }
        return existing_map

    def analyze_tasks(self, all_tasks: List[Dict[str, Any]], 
                      selected_dates: Optional[List[str]] = None,
                      board_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Analyzes tasks:
        - Filters by selected_dates (if provided)
        - Checks local state database
        - Queries Faro directly for duplicate titles
        - Segregates into pending (new) and existing (duplicate)
        """
        local_synced_hashes = self.state_manager.get_all_synced_hashes()
        faro_existing_map = self.fetch_existing_faro_titles_and_ids(board_id)

        all_dates = sorted(list({t["date"] for t in all_tasks}), reverse=True)
        active_dates = selected_dates if selected_dates is not None else all_dates

        pending_tasks = []
        duplicate_tasks = []
        other_date_tasks = []

        for task in all_tasks:
            task_date = task["date"]
            task_hash = task["hash"]
            norm_title = self.normalize_title(task["title"])

            # Check if this task already exists in Faro or local state
            is_in_local_db = task_hash in local_synced_hashes
            faro_match = faro_existing_map.get(norm_title)
            is_in_faro = faro_match is not None

            enriched_task = dict(task)
            enriched_task["is_duplicate"] = is_in_local_db or is_in_faro
            enriched_task["duplicate_source"] = "Faro Platform" if is_in_faro else ("Local Database" if is_in_local_db else None)
            enriched_task["faro_task_id"] = faro_match["id"] if is_in_faro else None

            if task_date not in active_dates:
                other_date_tasks.append(enriched_task)
            elif enriched_task["is_duplicate"]:
                duplicate_tasks.append(enriched_task)
            else:
                pending_tasks.append(enriched_task)

        return {
            "all_dates": all_dates,
            "selected_dates": active_dates,
            "pending_count": len(pending_tasks),
            "duplicate_count": len(duplicate_tasks),
            "pending_tasks": pending_tasks,
            "duplicate_tasks": duplicate_tasks,
            "other_date_tasks": other_date_tasks,
            "total_tasks_count": len(all_tasks),
        }

    def sync_single_task(self, task: Dict[str, Any], board_id: Optional[str], 
                         column_id: Optional[str] = None, dry_run: bool = False) -> Dict[str, Any]:
        """
        Syncs a single task to Faro.
        """
        task_hash = task["hash"]
        title = task["title"]
        # Format task description nicely with date, time, and original report details
        desc_parts = [
            f"📅 **تاریخ گزارش:** {task.get('date', '-')}",
            f"⏰ **زمان ثبت:** {task.get('time', '-')}",
            f"📌 **وضعیت در گزارش:** {task.get('status', 'انجام شد')}",
            "",
            "### شرح فعالیت:",
            task.get("description", "").strip(),
            "",
            f"---",
            f"<!-- sync_hash: {task_hash} -->"
        ]
        formatted_description = "\n".join(desc_parts)

        if dry_run:
            return {
                "success": True,
                "task_hash": task_hash,
                "title": title,
                "status": "dry_run",
                "message": "شبیه‌سازی: تسک در حالت تستی بررسی شد و آماده ثبت است.",
            }

        if not self.faro_client:
            return {
                "success": False,
                "task_hash": task_hash,
                "title": title,
                "status": "error",
                "message": "کلاینت فارو تنظیم نشده است.",
            }

        res = self.faro_client.create_task(
            board_id=board_id,
            title=title,
            description=formatted_description,
            column_id=column_id,
        )

        if res["success"]:
            faro_id = None
            if isinstance(res.get("data"), dict):
                faro_id = str(res["data"].get("id") or "")
            self.state_manager.mark_synced(
                task_hash=task_hash,
                date=task["date"],
                title=title,
                faro_task_id=faro_id,
                faro_board_id=board_id,
                faro_column_id=column_id,
                status="synced"
            )
            return {
                "success": True,
                "task_hash": task_hash,
                "title": title,
                "faro_id": faro_id,
                "status": "synced",
                "message": f"با موفقیت در فارو ثبت شد (شناسه: {faro_id or 'نامشخص'})",
            }
        else:
            return {
                "success": False,
                "task_hash": task_hash,
                "title": title,
                "status": "failed",
                "message": f"خطا در API فارو: {res.get('error', 'Unknown error')}",
            }
