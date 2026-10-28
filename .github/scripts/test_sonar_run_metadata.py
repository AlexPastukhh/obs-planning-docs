import importlib.util
import json
from pathlib import Path
import tempfile
import unittest


spec = importlib.util.spec_from_file_location("metadata", Path(__file__).with_name("write_sonar_run_metadata.py"))
metadata = importlib.util.module_from_spec(spec)
spec.loader.exec_module(metadata)


class MetadataTests(unittest.TestCase):
    def setUp(self):
        self.folder = tempfile.TemporaryDirectory()
        self.addCleanup(self.folder.cleanup)
        self.temp = Path(self.folder.name)
        self.path = self.temp / "fortis-sonar-report-task.txt"
        self.env = {
            "FORTIS_PROJECT_KEY": "AlexPastukhh_gd-cap",
            "GITHUB_REPOSITORY": "AlexPastukhh/gd-cap",
            "GITHUB_REPOSITORY_ID": "123", "GITHUB_RUN_ID": "456",
            "GITHUB_RUN_ATTEMPT": "1", "GITHUB_EVENT_NAME": "push",
            "GITHUB_SHA": "a" * 40, "GITHUB_WORKFLOW_SHA": "b" * 40,
            "GITHUB_WORKFLOW_REF": "AlexPastukhh/gd-cap/.github/workflows/sonarqube.yml@refs/heads/main",
            "FORTIS_SCAN_OUTCOME": "failure",
            "SONAR_TOKEN": "synthetic-secret-not-to-publish",
        }
        self.report = "projectKey=AlexPastukhh_gd-cap\nserverUrl=https://sonarcloud.io\nceTaskId=Aa_task-123\n"

    def write_report(self, value=None):
        self.path.write_text(self.report if value is None else value, encoding="utf-8")

    def test_red_gate_keeps_task_without_claiming_completion_or_approval(self):
        self.write_report()
        (self.temp / "fortis-sonar-checkout-sha.txt").write_text("c" * 40 + "\n")
        result = metadata.build_metadata(self.env, self.temp)
        self.assertEqual(result["scan_outcome"], "failure")
        self.assertEqual(result["ceTaskId"], "Aa_task-123")
        self.assertEqual(result["checkout_sha"], "c" * 40)
        self.assertIsNone(result["analysisId"])
        for key in ("analysis_to_sha_verified", "historical_findings_verified", "guard_approval", "findings_collected"):
            self.assertIs(result[key], False)
        self.assertIs(result["advisory_only"], True)

    def test_missing_task_does_not_borrow_another_analysis(self):
        self.env["FORTIS_SCAN_OUTCOME"] = "skipped"
        result = metadata.build_metadata(self.env, self.temp)
        self.assertEqual(result["report_task_status"], "missing")
        self.assertIsNone(result["ceTaskId"])
        self.assertIsNone(result["checkout_sha"])

    def test_pr_head_is_distinct_from_merge_checkout_and_event_sha(self):
        self.env.update(GITHUB_EVENT_NAME="pull_request", FORTIS_PR_HEAD_SHA="d" * 40)
        (self.temp / "fortis-sonar-checkout-sha.txt").write_text("e" * 40)
        result = metadata.build_metadata(self.env, self.temp)
        self.assertEqual(result["head_sha"], "d" * 40)
        self.assertEqual(result["github_event_sha"], "a" * 40)
        self.assertEqual(result["checkout_sha"], "e" * 40)
        self.env.pop("FORTIS_PR_HEAD_SHA")
        with self.assertRaises(ValueError):
            metadata.build_metadata(self.env, self.temp)

    def test_attempts_are_separate_even_at_same_sha(self):
        first = metadata.build_metadata(self.env, self.temp)
        self.env["GITHUB_RUN_ATTEMPT"] = "2"
        second = metadata.build_metadata(self.env, self.temp)
        self.assertEqual(first["run_id"], second["run_id"])
        self.assertNotEqual(first["run_attempt"], second["run_attempt"])

    def test_invalid_or_mismatched_task_is_not_copied(self):
        for text in (
            self.report.replace("AlexPastukhh_gd-cap", "another-project"),
            self.report.replace("https://sonarcloud.io", "https://example.invalid"),
            self.report + "ceTaskId=duplicate\n",
            self.report.replace("Aa_task-123", "../../bad"),
            self.report + "malformed line\n", "x" * 16385,
        ):
            with self.subTest(text=text[:50]):
                self.write_report(text)
                result = metadata.read_task(self.path, self.env["FORTIS_PROJECT_KEY"])
                self.assertEqual(result["report_task_status"], "invalid")
                self.assertIsNone(result["ceTaskId"])

    def test_symlink_is_rejected(self):
        other = self.temp / "other.txt"
        other.write_text(self.report)
        self.path.symlink_to(other)
        self.assertEqual(metadata.read_task(self.path, self.env["FORTIS_PROJECT_KEY"])["report_task_status"], "invalid")

    def test_unknown_properties_and_environment_secrets_are_not_serialized(self):
        self.write_report(self.report + "sonar.token=" + self.env["SONAR_TOKEN"] + "\nceTaskUrl=https://example.invalid\n")
        result = metadata.build_metadata(self.env, self.temp)
        encoded = json.dumps(result)
        self.assertNotIn(self.env["SONAR_TOKEN"], encoded)
        self.assertNotIn("ceTaskUrl", encoded)
        self.assertNotIn("example.invalid", encoded)


if __name__ == "__main__":
    unittest.main()
