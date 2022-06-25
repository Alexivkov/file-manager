import { rename } from "fs/promises";
import { resolve, parse } from "path";
import { displayCurrentDirectory } from '../helpers/displayCurrentDirectory.js';
import { OPERATION_FAILED } from "../helpers/constants.js";

export const handleRn = async ([pathToFile, newFileName]) => {
  try {
    if (/[\/\\]/g.test(newFileName)) throw new Error('Invalid new file name');

    pathToFile = resolve(pathToFile);

    const { dir } = parse(pathToFile);
    const pathFromFile = resolve(dir, newFileName);
    
    await rename(pathToFile, pathFromFile);
    displayCurrentDirectory();
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
}