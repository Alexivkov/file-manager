import { resolve } from "path";
import { stat } from "fs/promises";

export async function isFile(path) {
  try {
    path = resolve(path);
    const stats = await stat(path);
    return stats.isFile();
  } catch (error) {
    return false;
  }
}