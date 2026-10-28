"""Write advisory run identity; never infer a historical findings snapshot."""
import json
import os
from datetime import datetime, timezone
from pathlib import Path
import re


SHA = re.compile(r"[0-9a-f]{40}\Z")
TASK = re.compile(r"[A-Za-z0-9_-]{1,200}\Z")


def read_task(path, expected_project):
    empty = {"report_task_status": "missing", "ceTaskId": None}
    if path.is_symlink():
        return {**empty, "report_task_status": "invalid"}
    if not path.exists():
        return empty
    try:
        if not path.is_file():
            raise ValueError()
        with path.open("rb") as stream:
            raw = stream.read(16385)
        if len(raw) > 16384:
            raise ValueError()
        fields = {}
        for line in raw.decode("utf-8").splitlines():
            if not line.strip() or line.lstrip().startswith("#"):
                continue
            key, separator, value = line.partition("=")
            if not separator:
                raise ValueError()
            if key not in ("projectKey", "serverUrl", "ceTaskId"):
                continue
            if key in fields:
                raise ValueError()
            fields[key] = value
        if fields.get("projectKey") != expected_project:
            raise ValueError()
        if fields.get("serverUrl") != "https://sonarcloud.io":
            raise ValueError()
        if not TASK.fullmatch(fields.get("ceTaskId", "")):
            raise ValueError()
        return {"report_task_status": "recorded", "ceTaskId": fields["ceTaskId"]}
    except (OSError, ValueError, UnicodeError):
        return {**empty, "report_task_status": "invalid"}


def required_sha(value):
    if not SHA.fullmatch(value):
        raise ValueError("Missing or invalid GitHub SHA")
    return value


def positive_id(value):
    if not re.fullmatch(r"[1-9][0-9]*", value):
        raise ValueError("Missing or invalid GitHub identifier")
    return int(value)


def build_metadata(env, temp):
    project = env["FORTIS_PROJECT_KEY"]
    if not re.fullmatch(r"[A-Za-z0-9_.:-]{1,400}", project):
        raise ValueError("Invalid expected project")
    repository = env["GITHUB_REPOSITORY"]
    if not re.fullmatch(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", repository):
        raise ValueError("Invalid repository")
    event_sha = required_sha(env["GITHUB_SHA"])
    head_sha = env.get("FORTIS_PR_HEAD_SHA", "")
    if env["GITHUB_EVENT_NAME"] == "pull_request":
        head_sha = required_sha(head_sha)
    else:
        head_sha = event_sha
    outcome = env.get("FORTIS_SCAN_OUTCOME", "skipped")
    if outcome not in ("success", "failure", "cancelled", "skipped"):
        raise ValueError("Invalid scanner outcome")
    try:
        checkout_sha = required_sha((temp / "fortis-sonar-checkout-sha.txt").read_text().strip())
    except (OSError, ValueError, UnicodeError):
        checkout_sha = None
    return {
        "schema": "fortis-sonar-run-metadata-v1",
        "repository": repository,
        "repository_id": positive_id(env["GITHUB_REPOSITORY_ID"]),
        "run_id": positive_id(env["GITHUB_RUN_ID"]),
        "run_attempt": positive_id(env["GITHUB_RUN_ATTEMPT"]),
        "event_name": env["GITHUB_EVENT_NAME"],
        "workflow_ref": env["GITHUB_WORKFLOW_REF"],
        "workflow_sha": required_sha(env["GITHUB_WORKFLOW_SHA"]),
        "github_event_sha": event_sha,
        "head_sha": head_sha,
        "checkout_sha": checkout_sha,
        "project_key": project,
        "scan_outcome": outcome,
        **read_task(temp / "fortis-sonar-report-task.txt", project),
        "analysisId": None,
        "recorded_at_utc": datetime.now(timezone.utc).isoformat(),
        "identity_source": "unverified_source_repository_workflow",
        "findings_collected": False,
        "historical_findings_verified": False,
        "analysis_to_sha_verified": False,
        "advisory_only": True,
        "guard_approval": False,
    }


def main():
    temp = Path(os.environ["RUNNER_TEMP"])
    metadata = build_metadata(os.environ, temp)
    output = temp / "fortis-sonar-run.json"
    pending = output.with_suffix(".tmp")
    pending.write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")
    pending.replace(output)
    print("Advisory run metadata saved: task=" + metadata["report_task_status"]
          + "; scan=" + metadata["scan_outcome"])


if __name__ == "__main__":
    main()
