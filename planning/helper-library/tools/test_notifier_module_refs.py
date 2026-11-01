import tempfile
import unittest
from pathlib import Path
import json

from notifier_module_refs import catalog, refs

class TestNotifierModuleRefs(unittest.TestCase):
    def test_read_only_catalog_and_copyable_refs(self):
        with tempfile.TemporaryDirectory() as root:
            folder = Path(root)
            item = {'schemaVersion':1,'kind':'module','id':'demo.module',
                    'title':'Demo','text':'test'}
            (folder / 'demo.module.module.md').write_text(
                "[PLANNING_HELPER_LIBRARY_ITEM]\n"+json.dumps(item)+
                "\n[/PLANNING_HELPER_LIBRARY_ITEM]\n",encoding='utf-8')
            (folder / 'wrong.module.md').write_text("invalid")
            entries = catalog(folder)
            self.assertEqual(entries, {'demo.module':'Demo'})
            self.assertEqual(refs(['demo.module','demo.module'],entries),
                             '[[module:demo.module]]')
            with self.assertRaises(ValueError):
                refs(['demo.module','wrong.module'],entries)

    def test_real_repo_has_new_observatory_module(self):
        self.assertIn('fortis.observatory-telemetry',catalog())
        self.assertEqual(refs(['fortis.observatory-telemetry'],catalog()),
                         '[[module:fortis.observatory-telemetry]]')

if __name__ == '__main__':
    unittest.main()
