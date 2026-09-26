import sqlite3
import os
from typing import Dict, Any, Optional, List

class StateManager:
    """
    Manages local sync history using SQLite to avoid re-syncing duplicate tasks.
    """

    def __init__(self, db_path: str = "sync_state.db"):
        self.db_path = db_path
        self._init_db()

    def _get_connection(self):
        return sqlite3.connect(self.db_path)

    def _init_db(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS synced_tasks (
                    task_hash TEXT PRIMARY KEY,
                    date TEXT,
                    title TEXT,
                    faro_task_id TEXT,
                    faro_board_id TEXT,
                    faro_column_id TEXT,
                    synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    status TEXT
                )
            """)
            conn.commit()

    def is_synced(self, task_hash: str) -> bool:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT 1 FROM synced_tasks WHERE task_hash = ? AND status = 'synced'", (task_hash,))
            return cursor.fetchone() is not None

    def get_synced_task(self, task_hash: str) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM synced_tasks WHERE task_hash = ?", (task_hash,))
            row = cursor.fetchone()
            return dict(row) if row else None

    def mark_synced(self, task_hash: str, date: str, title: str, faro_task_id: str = None, 
                    faro_board_id: str = None, faro_column_id: str = None, status: str = "synced"):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO synced_tasks (task_hash, date, title, faro_task_id, faro_board_id, faro_column_id, status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(task_hash) DO UPDATE SET
                    faro_task_id=excluded.faro_task_id,
                    faro_board_id=excluded.faro_board_id,
                    faro_column_id=excluded.faro_column_id,
                    status=excluded.status,
                    synced_at=CURRENT_TIMESTAMP
            """, (task_hash, date, title, faro_task_id, faro_board_id, faro_column_id, status))
            conn.commit()

    def get_all_synced_hashes(self) -> set:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT task_hash FROM synced_tasks WHERE status = 'synced'")
            return {row[0] for row in cursor.fetchall()}

    def clear_all(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM synced_tasks")
            conn.commit()
