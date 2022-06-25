import { chdir } from "process";
import { displayCurrentDirectory } from '../helpers/displayCurrentDirectory.js';
import { OPERATION_FAILED } from "../helpers/constants.js";

export const handleUp = async () => {
  try {
    chdir('..');
    displayCurrentDirectory();
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
}