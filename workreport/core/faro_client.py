import requests
from typing import Dict, Any, List, Optional
import urllib.parse

class FaroClient:
    """
    Client for interacting with the Faro Task Management APIs based on tasks.md.
    """

    def __init__(self, base_url: str, session_cookie: str = "", csrf_token: str = "", auth_token: str = ""):
        clean_url = base_url.strip().rstrip("/")
        if clean_url.endswith("/api/v1"):
            clean_url = clean_url[:-7].rstrip("/")
        elif clean_url.endswith("/api"):
            clean_url = clean_url[:-4].rstrip("/")
        self.base_url = clean_url
        self.session_cookie = session_cookie.strip()
        self.csrf_token = csrf_token.strip()
        self.auth_token = auth_token.strip()
        self.session = requests.Session()
        self._configure_session()

    def _configure_session(self):
        from urllib.parse import urlparse
        domain = urlparse(self.base_url).netloc

        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "fa,en-US;q=0.9,en;q=0.8",
            "Referer": f"{self.base_url}/",
            "Origin": self.base_url,
        })

        # Build comprehensive Cookie header
        cookie_parts = []
        extracted_csrf = None

        if self.session_cookie:
            raw_s = self.session_cookie.strip()
            # If user pasted full cookie string like "sessionid=xyz; csrftoken=abc"
            if "sessionid=" in raw_s or ";" in raw_s:
                cookie_parts.append(raw_s)
                # Try to extract csrftoken if not provided separately
                for part in raw_s.split(";"):
                    if "csrftoken=" in part:
                        extracted_csrf = part.split("csrftoken=")[-1].strip()
            else:
                cookie_parts.append(f"sessionid={raw_s}")
                # Also set in cookie jar with domain
                self.session.cookies.set("sessionid", raw_s, domain=domain)

        if self.csrf_token:
            extracted_csrf = self.csrf_token.strip()

        if extracted_csrf:
            if not any("csrftoken=" in p for p in cookie_parts):
                cookie_parts.append(f"csrftoken={extracted_csrf}")
            self.session.cookies.set("csrftoken", extracted_csrf, domain=domain)
            self.session.headers["X-CSRFToken"] = extracted_csrf

        if cookie_parts:
            self.session.headers["Cookie"] = "; ".join(cookie_parts)

        if self.auth_token:
            prefix = "Bearer " if not self.auth_token.lower().startswith("bearer ") and not self.auth_token.lower().startswith("token ") else ""
            self.session.headers["Authorization"] = f"{prefix}{self.auth_token}"

    def check_connection(self) -> Dict[str, Any]:
        """Checks if connection to Faro is working and credentials are valid."""
        try:
            url = f"{self.base_url}/api/v1/tasks/boards/"
            response = self.session.get(url, timeout=12, allow_redirects=True)
            if response.status_code == 200:
                try:
                    data = response.json()
                    boards = data if isinstance(data, list) else data.get("results", data.get("boards", []))
                    return {"success": True, "message": "ارتباط با موفقیت برقرار شد.", "boards_count": len(boards)}
                except Exception:
                    return {"success": True, "message": "ارتباط با سرور برقرار شد (کد 200).", "boards_count": 0}
            elif response.status_code in (401, 403):
                server_detail = ""
                try:
                    err_json = response.json()
                    server_detail = f" — پاسخ سرور: {err_json.get('detail') or err_json.get('message') or str(err_json)}"
                except Exception:
                    server_detail = f" — محتوا: {response.text[:120]}" if response.text else ""
                return {
                    "success": False, 
                    "status_code": response.status_code,
                    "message": f"خطای دسترسی ({response.status_code}): احراز هویت تایید نشد.{server_detail}"
                }
            else:
                return {
                    "success": False, 
                    "status_code": response.status_code,
                    "message": f"پاسخ غیرمنتظره سرور ({response.status_code}): {response.text[:150]}"
                }
        except Exception as e:
            return {"success": False, "message": f"خطا در اتصال به سرور: {str(e)}"}

    def get_boards(self) -> List[Dict[str, Any]]:
        """Fetch list of task boards."""
        try:
            url = f"{self.base_url}/api/v1/tasks/boards/"
            response = self.session.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                return data if isinstance(data, list) else data.get("results", data.get("boards", []))
            return []
        except Exception:
            return []

    def get_board_columns(self, board_id: str) -> List[Dict[str, Any]]:
        """Fetch columns of a specific board."""
        try:
            url = f"{self.base_url}/api/v1/tasks/boards/{board_id}/columns/"
            response = self.session.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                return data if isinstance(data, list) else data.get("results", data.get("columns", []))
            return []
        except Exception:
            return []

    def get_board_tasks(self, board_id: str) -> List[Dict[str, Any]]:
        """Fetch all tasks in a specific board."""
        try:
            url = f"{self.base_url}/api/v1/tasks/boards/{board_id}/tasks/"
            response = self.session.get(url, timeout=15)
            if response.status_code == 200:
                data = response.json()
                return data if isinstance(data, list) else data.get("results", data.get("tasks", []))
            return []
        except Exception:
            return []

    def get_feed_tasks(self) -> List[Dict[str, Any]]:
        """Fetch tasks feed from /api/v1/tasks/feed/."""
        try:
            url = f"{self.base_url}/api/v1/tasks/feed/"
            response = self.session.get(url, timeout=15)
            if response.status_code == 200:
                data = response.json()
                return data if isinstance(data, list) else data.get("results", data.get("items", []))
            return []
        except Exception:
            return []

    def create_task(self, board_id: Optional[str], title: str, description: str, 
                    column_id: Optional[str] = None, extra_data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Creates a task in Faro. Uses board-specific endpoint if board_id provided,
        otherwise uses /api/v1/tasks/items/.
        """
        payload = {
            "title": title,
            "description": description,
        }
        if column_id:
            payload["column_id"] = column_id
            payload["column"] = column_id
        if extra_data:
            payload.update(extra_data)

        if board_id:
            url = f"{self.base_url}/api/v1/tasks/boards/{board_id}/tasks/"
        else:
            url = f"{self.base_url}/api/v1/tasks/items/"

        try:
            response = self.session.post(url, json=payload, timeout=15)
            if response.status_code in (200, 201):
                return {"success": True, "data": response.json(), "status_code": response.status_code}
            else:
                return {"success": False, "error": response.text[:300], "status_code": response.status_code}
        except Exception as e:
            return {"success": False, "error": str(e), "status_code": 0}
