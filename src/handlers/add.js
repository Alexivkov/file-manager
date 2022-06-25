import { open } from 'fs/promises'
import { resolve } from 'path'
import { cwd } from 'process'
import { displayCurrentDirectory } from '../helpers/displayCurrentDirectory.js';
import { OPERATION_FAILED } from '../helpers/constants.js';

export const handleAdd = async ([newFileName]) => {
  let fileHandle;

  try {
    const filePath = resolve(cwd(), newFileName);
    fileHandle = await open(filePath, 'w');
    displayCurrentDirectory();
  } catch(error) {
    console.error(OPERATION_FAILED);
  } finally {
    fileHandle?.close();
  }
}