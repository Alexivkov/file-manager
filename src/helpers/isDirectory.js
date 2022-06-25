import { resolve } from 'path';
import { stat } from 'fs/promises';
import { cwd } from 'process';

export const isDirectory = async(path) => {
  try {
    path = resolve(path);
    const stats = await stat(path);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}