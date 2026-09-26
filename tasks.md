# اپ `tasks` — بردهای کانبان و وظایف

مدیریت وظایف (Task) در قالب بردهای کانبان (TaskBoard = «دسته‌بندی») با ستون،
چک‌لیست، کامنت و برچسب.

---

## API (`/api/v1/`)
| Endpoint | Method | Auth | توضیح |
|---|---|---|---|
| `/api/v1/tasks/feed/` | GET | session | فید تسک‌های تب‌محور (my/assigned/created و ...) |
| `/api/v1/tasks/items/` | POST | session | ساخت تسک جدید (بدون board مشخص) |
| `/api/v1/tasks/members/` | GET | session | فهرست اعضای فضای کاری برای واگذاری |
| `/api/v1/tasks/labels/` | GET, POST | session | فهرست/ساخت برچسب |
| `/api/v1/tasks/boards/` | GET, POST | session | فهرست/ساخت برد (TaskBoard) |
| `/api/v1/tasks/boards/<board_id>/` | GET, PUT, DELETE | session | جزئیات/ویرایش/حذف برد |
| `/api/v1/tasks/boards/<board_id>/tasks/` | GET, POST | session | فهرست/ساخت تسک در برد |
| `/api/v1/tasks/boards/<board_id>/columns/` | GET, POST | session | فهرست/ساخت ستون کانبان |
| `/api/v1/tasks/columns/<column_id>/` | PUT, DELETE | session | ویرایش/حذف ستون |
| `/api/v1/tasks/items/<task_id>/move/` | POST | session | جابجایی تسک بین ستون‌ها |
| `/api/v1/tasks/items/<task_id>/` | GET, PUT, DELETE | session | جزئیات/ویرایش/حذف تسک |
| `/api/v1/tasks/items/<task_id>/checklist/` | GET, POST | session | فهرست/افزودن آیتم چک‌لیست |
| `/api/v1/tasks/items/<task_id>/comments/` | GET, POST | session | فهرست/افزودن کامنت |
| `/api/v1/tasks/checklist/<item_id>/` | PUT, DELETE | session | ویرایش/حذف آیتم چک‌لیست |
| `/api/v1/tasks/comments/<comment_id>/` | PUT, DELETE | session | ویرایش/حذف کامنت |

منبع: `apps/tasks/api/urls.py` / `apps/tasks/api/views.py` (این اپ صراحتاً قرارداد
«بدون DRF» پروژه را در کامنت بالای `views.py` مستند کرده است).
