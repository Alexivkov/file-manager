import { unlink } from "fs/promises";
import { resolve } from "path";
import { displayCurrentDirectory } from '../helpers/displayCurrentDirectory.js';
import { OPERATION_FAILED } from "../helpers/constants.js";


export const handleRm = async ([pathToFile]) => {
  try {
    pathToFile = resolve(pathToFile);
    await unlink(pathToFile);
    displayCurrentDirectory();
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
}