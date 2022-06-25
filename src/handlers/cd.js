import { chdir } from "process";
import { OPERATION_FAILED } from "../helpers/constants.js";
import { displayCurrentDirectory } from '../helpers/displayCurrentDirectory.js';


export const handleCd = async ([DirectoryPath]) => {
  try {
    chdir(DirectoryPath)
    displayCurrentDirectory();
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
}