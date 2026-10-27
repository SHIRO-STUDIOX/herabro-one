import json
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

ROOT = Path(__file__).resolve().parents[3]
FA = json.loads((ROOT / 'assets/l10n/fa.json').read_text(encoding='utf-8'))

def resolve(key):
    if key in FA:
        return FA[key]
    value = FA
    for part in key.split('.'):
        if not isinstance(value, dict) or part not in value:
            return '[unresolved]'
        value = value[part]
    return value if isinstance(value, str) else '[object]'

for pattern in sys.argv[1:]:
    for path in sorted(ROOT.glob(pattern)):
        if not path.is_file():
            continue
        print('\nFILE', path.relative_to(ROOT).as_posix())
        for number, line in enumerate(path.read_text(encoding='utf-8').splitlines(), 1):
            keys = re.findall(r"'([a-z_]+(?:\.[a-z0-9_]+)+)'", line)
            for key in keys:
                if not key.endswith('.dart') and not key.startswith(('package.', 'https.')):
                    print(f'{number}: {key} = {resolve(key)}')
            if re.search(r'(Future<|void _handle|bool get |can[A-Z]|isAdmin|isOwner|validator:|\.get\(|\.post\(|\.put\(|\.delete\(|\.patch\(|path:|coming_soon|TODO|Unimplemented)', line):
                print(f'{number}: {line.strip()}')
