import os
import re
import hashlib
from typing import List, Dict, Any

class ReportParser:
    """
    Parses project-report.md file into structured task dictionaries.
    """

    def __init__(self, file_path: str):
        self.file_path = file_path

    @staticmethod
    def generate_task_hash(date: str, title: str) -> str:
        """Generates a stable unique hash for each task based on date and cleaned title."""
        cleaned_title = re.sub(r'\s+', ' ', title.strip()).lower()
        key = f"{date}_{cleaned_title}"
        return hashlib.sha256(key.encode('utf-8')).hexdigest()[:16]

    def parse(self) -> List[Dict[str, Any]]:
        if not os.path.exists(self.file_path):
            raise FileNotFoundError(f"Report file not found: {self.file_path}")

        with open(self.file_path, "r", encoding="utf-8") as f:
            content = f.read()

        tasks = []
        current_date = None

        # Split content into sections based on date headers: ## YYYY-MM-DD
        # or match lines
        lines = content.splitlines()
        current_task = None
        current_field = None

        date_pattern = re.compile(r"^##\s+(\d{4}-\d{2}-\d{2})")
        title_pattern = re.compile(r"^###\s+(?:عنوان(?:\s+تست\s+چالش)?:\s*)?(.*)")
        status_pattern = re.compile(r"^\*\*وضعیت:\*\*\s*(.*)")
        time_pattern = re.compile(r"^\*\*زمان ثبت گزارش:\*\*\s*(.*)")
        desc_start_pattern = re.compile(r"^\*\*توضیح:\*\*\s*(.*)")

        def finalize_task(task):
            if task and task.get("title"):
                task["description"] = "\n".join(task["desc_lines"]).strip()
                del task["desc_lines"]
                task["hash"] = self.generate_task_hash(task["date"], task["title"])
                tasks.append(task)

        for line in lines:
            stripped = line.strip()

            # Check for date header
            date_match = date_pattern.match(stripped)
            if date_match:
                current_date = date_match.group(1)
                finalize_task(current_task)
                current_task = None
                current_field = None
                continue

            # Check for task title
            if stripped.startswith("### "):
                finalize_task(current_task)
                title_match = title_pattern.match(stripped)
                title = title_match.group(1).strip() if title_match else stripped.replace("###", "").strip()
                current_task = {
                    "date": current_date or "unknown",
                    "title": title,
                    "desc_lines": [],
                    "description": "",
                    "status": "انجام شد",
                    "time": "",
                }
                current_field = None
                continue

            if not current_task:
                continue

            # Check for description start
            desc_match = desc_start_pattern.match(stripped)
            if desc_match:
                current_field = "description"
                initial_desc = desc_match.group(1).strip()
                if initial_desc:
                    current_task["desc_lines"].append(initial_desc)
                continue

            # Check for status
            status_match = status_pattern.match(stripped)
            if status_match:
                current_task["status"] = status_match.group(1).strip()
                current_field = None
                continue

            # Check for report time
            time_match = time_pattern.match(stripped)
            if time_match:
                current_task["time"] = time_match.group(1).strip()
                current_field = None
                continue

            # Append multi-line description if we are in description block
            if current_field == "description":
                current_task["desc_lines"].append(line)

        # Finalize last task
        finalize_task(current_task)

        return tasks
