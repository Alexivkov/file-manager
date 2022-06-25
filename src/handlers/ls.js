import { readdir } from "fs/promises";
import { resolve } from "path";
import { cwd } from "process";
import { displayCurrentDirectory } from '../helpers/displayCurrentDirectory.js';
import { OPERATION_FAILED } from "../helpers/constants.js";

export const handleLs = async() => {
  try {
    const currentDirectory = resolve(cwd());
    const files = await readdir(currentDirectory);
    console.table(files);
    displayCurrentDirectory();
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
}