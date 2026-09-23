import path from "node:path";

import { RequestRejectedError } from "../contracts";

export function normalizeRelativePath(relativePath: string): string {
  if (
    relativePath.startsWith("/") ||
    relativePath.startsWith("\\") ||
    /^[A-Za-z]:[\\/]/u.test(relativePath)
  ) {
    throw new RequestRejectedError("Target path must be workspace-relative.");
  }

  const segments = relativePath.replaceAll("\\", "/").split("/");
  if (
    segments.length === 0 ||
    segments.some(
      (segment) =>
        segment.length === 0 || segment === "." || segment === ".." || segment.includes(":"),
    )
  ) {
    throw new RequestRejectedError(
      "Target path must be normalized and must not contain traversal segments.",
    );
  }

  return segments.join(path.sep);
}

export function normalizeAbsoluteLocalPath(
  absolutePath: string,
  platform: NodeJS.Platform = process.platform,
): string {
  const pathApi = platform === "win32" ? path.win32 : path.posix;

  if (platform === "win32") {
    if (
      !/^[A-Za-z]:[\\/]/u.test(absolutePath) ||
      absolutePath.slice(2).includes(":")
    ) {
      throw new RequestRejectedError(
        "Absolute target must be a local drive path; UNC, device and drive-relative paths are not allowed.",
      );
    }
  } else if (!pathApi.isAbsolute(absolutePath) || absolutePath.startsWith("//")) {
    throw new RequestRejectedError(
      "Absolute target must be a local absolute path; network-style paths are not allowed.",
    );
  }

  if (/[\u0000-\u001F\u007F]/u.test(absolutePath)) {
    throw new RequestRejectedError(
      "Absolute target contains an invalid control character.",
    );
  }

  return pathApi.normalize(absolutePath);
}

export function isPathInside(
  rootPath: string,
  candidatePath: string,
  platform: NodeJS.Platform = process.platform,
): boolean {
  const pathApi = platform === "win32" ? path.win32 : path.posix;
  const relative = pathApi.relative(rootPath, candidatePath);

  return (
    relative.length > 0 &&
    relative !== ".." &&
    !relative.startsWith(`..${pathApi.sep}`) &&
    !pathApi.isAbsolute(relative)
  );
}

export function canonicalLocalPathKey(filePath: string): string {
  const normalized = path.normalize(filePath);
  return process.platform === "win32" ? normalized.toLocaleLowerCase("en-US") : normalized;
}
