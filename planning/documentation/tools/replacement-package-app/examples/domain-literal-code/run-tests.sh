#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
rm -rf out
mkdir -p out
javac --release 21 -Xlint:all -Werror -d out $(find src -name '*.java' | sort)
java -cp out obs.replacementpackage.domain.testing.DomainLiteralTestSuite
