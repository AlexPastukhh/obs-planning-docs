import path from "node:path";
import {
  createWriteStream,
  type Stats,
} from "node:fs";
import {
  lstat,
  mkdir,
  mkdtemp,
  rename,
  rm,
} from "node:fs/promises";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

import type { Entry } from "yauzl";
import { openPromise } from "yauzl";

import { RequestRejectedError } from "../contracts";
import { canonicalLocalPathKey, isPathInside } from "../local-path-authority/pathSafety";

export const MAX_ARCHIVE_ENTRIES = 10_000;
export const MAX_ARCHIVE_FILE_BYTES = 256 * 1024 * 1024;
export const MAX_ARCHIVE_TOTAL_BYTES = 1024 * 1024 * 1024;
const MAX_ARCHIVE_ENTRY_PATH_LENGTH = 4096;

export interface ZipExtractionResult {
  readonly folderPath: string;
  readonly extraction: "extracted" | "reusedExisting";
}

export interface ZipExtractor {
  extract(archivePath: string, destinationPath: string): Promise<ZipExtractionResult>;
}

interface PreparedEntry {
  readonly outputPath: string;
  readonly key: string;
  readonly parentKeys: readonly string[];
  readonly topLevelName: string;
  readonly isDirectory: boolean;
}

function isMissing(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ENOENT"
  );
}

async function optionalLstat(candidatePath: string): Promise<Stats | undefined> {
  try {
    return await lstat(candidatePath);
  } catch (error) {
    if (isMissing(error)) {
      return undefined;
    }
    throw error;
  }
}

function rejectInvalidSegment(segment: string): void {
  if (
    segment.length === 0 ||
    segment === "." ||
    segment === ".." ||
    /[<>:"|?*\u0000-\u001F\u007F]/u.test(segment) ||
    /[ .]$/u.test(segment)
  ) {
    throw new RequestRejectedError(
      "ZIP entry contains an unsafe or unsupported path segment.",
    );
  }

  const stem = segment.split(".", 1)[0]?.toLocaleUpperCase("en-US");
  if (
    stem === "CON" ||
    stem === "PRN" ||
    stem === "AUX" ||
    stem === "NUL" ||
    /^COM[1-9]$/u.test(stem ?? "") ||
    /^LPT[1-9]$/u.test(stem ?? "")
  ) {
    throw new RequestRejectedError("ZIP entry uses a reserved Windows path name.");
  }
}

function rejectUnsupportedEntryType(entry: Entry, isDirectory: boolean): void {
  const creatorSystem = entry.versionMadeBy >>> 8;
  if (creatorSystem !== 3) {
    return;
  }

  const mode = (entry.externalFileAttributes >>> 16) & 0xffff;
  const fileType = mode & 0o170000;
  if (fileType === 0) {
    return;
  }

  const expectedType = isDirectory ? 0o040000 : 0o100000;
  if (fileType !== expectedType) {
    throw new RequestRejectedError(
      "ZIP links and non-regular special entries are not supported.",
    );
  }
}

export function prepareZipEntry(entry: Entry, stagingRoot: string): PreparedEntry {
  if (entry.isEncrypted()) {
    throw new RequestRejectedError("Encrypted ZIP entries are not supported.");
  }
  if (!entry.canDecodeFileData()) {
    throw new RequestRejectedError("ZIP entry uses an unsupported compression method.");
  }
  if (entry.fileName.length === 0 || entry.fileName.length > MAX_ARCHIVE_ENTRY_PATH_LENGTH) {
    throw new RequestRejectedError("ZIP entry path is empty or too long.");
  }
  if (entry.fileName.startsWith("/") || /^[A-Za-z]:/u.test(entry.fileName)) {
    throw new RequestRejectedError("ZIP entry must use a relative path.");
  }

  const isDirectory = entry.fileName.endsWith("/");
  const rawSegments = entry.fileName.split("/");
  const segments = isDirectory ? rawSegments.slice(0, -1) : rawSegments;
  if (segments.length === 0) {
    throw new RequestRejectedError("ZIP entry must identify a path inside the archive.");
  }
  segments.forEach(rejectInvalidSegment);
  rejectUnsupportedEntryType(entry, isDirectory);

  const outputPath = path.resolve(stagingRoot, ...segments);
  if (!isPathInside(stagingRoot, outputPath)) {
    throw new RequestRejectedError("ZIP entry escapes the extraction directory.");
  }

  const key = canonicalLocalPathKey(outputPath);
  const parentKeys: string[] = [];
  for (let index = 1; index < segments.length; index += 1) {
    parentKeys.push(
      canonicalLocalPathKey(path.resolve(stagingRoot, ...segments.slice(0, index))),
    );
  }

  const topLevelName = segments[0];
  if (topLevelName === undefined) {
    throw new RequestRejectedError("ZIP entry has no top-level path segment.");
  }

  return { outputPath, key, parentKeys, topLevelName, isDirectory };
}

export class LocalZipExtractor implements ZipExtractor {
  public async extract(
    archivePath: string,
    destinationPath: string,
  ): Promise<ZipExtractionResult> {
    const existingDestination = await optionalLstat(destinationPath);
    if (existingDestination !== undefined) {
      if (!existingDestination.isDirectory() || existingDestination.isSymbolicLink()) {
        throw new RequestRejectedError(
          "The ZIP destination already exists and is not a regular directory.",
        );
      }

      return { folderPath: destinationPath, extraction: "reusedExisting" };
    }

    const parentPath = path.dirname(destinationPath);
    const baseName = path.basename(destinationPath);
    let stagingRoot = await mkdtemp(
      path.join(parentPath, `.${baseName}.study-tab-launcher-`),
    );

    try {
      const topLevelNames = new Set<string>();
      const fileKeys = new Set<string>();
      const directoryKeys = new Set<string>();
      let containsTopLevelFile = false;
      let entryCount = 0;
      let declaredTotalBytes = 0;
      let writtenTotalBytes = 0;

      const zipFile = await openPromise(archivePath, {
        decodeStrings: true,
        strictFileNames: false,
        validateEntrySizes: true,
      });

      try {
        for await (const entry of zipFile.eachEntry()) {
          entryCount += 1;
          if (entryCount > MAX_ARCHIVE_ENTRIES) {
            throw new RequestRejectedError(
              `ZIP contains more than ${MAX_ARCHIVE_ENTRIES} entries.`,
            );
          }

          const prepared = prepareZipEntry(entry, stagingRoot);
          if (prepared.parentKeys.some((key) => fileKeys.has(key))) {
            throw new RequestRejectedError(
              "ZIP entry conflicts with a file used as a parent directory.",
            );
          }
          if (
            fileKeys.has(prepared.key) ||
            (prepared.isDirectory && directoryKeys.has(prepared.key)) ||
            (!prepared.isDirectory && directoryKeys.has(prepared.key))
          ) {
            throw new RequestRejectedError("ZIP contains duplicate output paths.");
          }

          topLevelNames.add(prepared.topLevelName);
          if (!prepared.isDirectory && prepared.parentKeys.length === 0) {
            containsTopLevelFile = true;
          }

          if (prepared.isDirectory) {
            directoryKeys.add(prepared.key);
            await mkdir(prepared.outputPath, { recursive: true, mode: 0o700 });
            continue;
          }

          if (entry.uncompressedSize > MAX_ARCHIVE_FILE_BYTES) {
            throw new RequestRejectedError(
              `ZIP entry exceeds ${MAX_ARCHIVE_FILE_BYTES} uncompressed bytes.`,
            );
          }
          declaredTotalBytes += entry.uncompressedSize;
          if (declaredTotalBytes > MAX_ARCHIVE_TOTAL_BYTES) {
            throw new RequestRejectedError(
              `ZIP exceeds ${MAX_ARCHIVE_TOTAL_BYTES} total uncompressed bytes.`,
            );
          }

          fileKeys.add(prepared.key);
          prepared.parentKeys.forEach((key) => directoryKeys.add(key));
          await mkdir(path.dirname(prepared.outputPath), {
            recursive: true,
            mode: 0o700,
          });

          const readStream = await zipFile.openReadStreamPromise(entry);
          let fileWrittenBytes = 0;
          const limiter = new Transform({
            transform(chunk: Buffer, _encoding, callback): void {
              fileWrittenBytes += chunk.length;
              writtenTotalBytes += chunk.length;
              if (fileWrittenBytes > MAX_ARCHIVE_FILE_BYTES) {
                callback(
                  new RequestRejectedError(
                    `ZIP entry exceeds ${MAX_ARCHIVE_FILE_BYTES} written bytes.`,
                  ),
                );
                return;
              }
              if (writtenTotalBytes > MAX_ARCHIVE_TOTAL_BYTES) {
                callback(
                  new RequestRejectedError(
                    `ZIP exceeds ${MAX_ARCHIVE_TOTAL_BYTES} total written bytes.`,
                  ),
                );
                return;
              }
              callback(null, chunk);
            },
          });

          await pipeline(
            readStream,
            limiter,
            createWriteStream(prepared.outputPath, { flags: "wx", mode: 0o600 }),
          );
        }
      } finally {
        if (zipFile.isOpen) {
          zipFile.close();
        }
      }

      if (entryCount === 0) {
        throw new RequestRejectedError("ZIP archive is empty.");
      }

      if ((await optionalLstat(destinationPath)) !== undefined) {
        throw new RequestRejectedError(
          "The ZIP destination appeared while extraction was running.",
        );
      }

      const onlyTopLevel =
        topLevelNames.size === 1 ? topLevelNames.values().next().value : undefined;
      if (onlyTopLevel !== undefined && !containsTopLevelFile) {
        const wrappedRoot = path.join(stagingRoot, onlyTopLevel);
        const wrappedStat = await optionalLstat(wrappedRoot);
        if (wrappedStat?.isDirectory() !== true || wrappedStat.isSymbolicLink()) {
          throw new RequestRejectedError("ZIP top-level wrapper is not a directory.");
        }

        await rename(wrappedRoot, destinationPath);
        await rm(stagingRoot, { recursive: true, force: true });
      } else {
        await rename(stagingRoot, destinationPath);
      }
      stagingRoot = "";

      return { folderPath: destinationPath, extraction: "extracted" };
    } finally {
      if (stagingRoot.length > 0) {
        await rm(stagingRoot, { recursive: true, force: true });
      }
    }
  }
}
