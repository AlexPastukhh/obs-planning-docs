import path from "node:path";
import { constants, createWriteStream, type Stats } from "node:fs";
import { lstat, mkdir, mkdtemp, open, opendir, realpath, rename, rm } from "node:fs/promises";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

import { RequestRejectedError } from "../contracts";
import { isPathInside } from "../local-path-authority/pathSafety";
import {
  MAX_ARCHIVE_ENTRIES,
  MAX_ARCHIVE_FILE_BYTES,
  MAX_ARCHIVE_TOTAL_BYTES,
} from "./zipExtractor";

async function optionalLstat(candidate: string): Promise<Stats | undefined> {
  try {
    return await lstat(candidate);
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
}

export interface FolderCopier {
  copy(sourcePath: string, destinationPath: string): Promise<void>;
}

export class LocalFolderCopier implements FolderCopier {
  public async copy(sourcePath: string, destinationPath: string): Promise<void> {
    const sourceStat = await lstat(sourcePath);
    if (!sourceStat.isDirectory() || sourceStat.isSymbolicLink()) {
      throw new RequestRejectedError("Project source must be a real directory, not a link or junction.");
    }
    if (await optionalLstat(destinationPath)) {
      throw new RequestRejectedError("Destination project already exists; it will not be overwritten or reused.");
    }

    const parent = path.dirname(destinationPath);
    let staging = await mkdtemp(path.join(parent, `.${path.basename(destinationPath)}.study-tab-launcher-`));
    let entries = 0;
    let totalBytes = 0;
    try {
      const visit = async (sourceDirectory: string, outputDirectory: string): Promise<void> => {
        const directory = await opendir(sourceDirectory);
        for await (const entry of directory) {
          entries += 1;
          if (entries > MAX_ARCHIVE_ENTRIES) {
            throw new RequestRejectedError(`Project folder exceeds ${MAX_ARCHIVE_ENTRIES} entries.`);
          }
          const input = path.join(sourceDirectory, entry.name);
          const output = path.join(outputDirectory, entry.name);
          if (output.length > 4096 || !isPathInside(staging, output)) {
            throw new RequestRejectedError("Project folder contains an unsafe or overlong path.");
          }
          const metadata = await lstat(input);
          if (metadata.isSymbolicLink()) {
            throw new RequestRejectedError("Project folder contains a link or junction.");
          }
          const canonicalInput = await realpath(input);
          if (!isPathInside(sourcePath, canonicalInput)) {
            throw new RequestRejectedError("Project folder entry resolves outside its source.");
          }
          if (metadata.isDirectory()) {
            await mkdir(output, { mode: 0o700 });
            await visit(input, output);
          } else if (metadata.isFile()) {
            if (metadata.size > MAX_ARCHIVE_FILE_BYTES || totalBytes + metadata.size > MAX_ARCHIVE_TOTAL_BYTES) {
              throw new RequestRejectedError("Project folder exceeds the per-file or total copy size limit.");
            }
            const handle = await open(input, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0));
            try {
              const opened = await handle.stat();
              if (!opened.isFile() || opened.size > MAX_ARCHIVE_FILE_BYTES) {
                throw new RequestRejectedError("Project folder entry changed or exceeds the file size limit.");
              }
              let fileBytes = 0;
              const limit = new Transform({
                transform(chunk: Buffer, _encoding, callback): void {
                  fileBytes += chunk.length;
                  totalBytes += chunk.length;
                  if (fileBytes > MAX_ARCHIVE_FILE_BYTES || totalBytes > MAX_ARCHIVE_TOTAL_BYTES) {
                    callback(new RequestRejectedError("Project folder exceeds the copy size limit."));
                  } else {
                    callback(null, chunk);
                  }
                },
              });
              await pipeline(handle.createReadStream({ autoClose: false }), limit, createWriteStream(output, { flags: "wx", mode: 0o600 }));
            } finally {
              await handle.close();
            }
          } else {
            throw new RequestRejectedError("Project folder contains a non-regular entry.");
          }
        }
      };
      await visit(sourcePath, staging);
      if (await optionalLstat(destinationPath)) {
        throw new RequestRejectedError("Destination project appeared during copying.");
      }
      await rename(staging, destinationPath);
      staging = "";
    } finally {
      if (staging) {
        await rm(staging, { recursive: true, force: true });
      }
    }
  }
}
