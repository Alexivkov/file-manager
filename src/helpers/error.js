import { OPERATION_FAILED } from "./constants";
import displayCurrentDirectory from './helpers/displayCurrentDirectory.js';


export function handleError(error) {
  if (error) {
    console.error(OPERATION_FAILED);
  } else {
    displayCurrentDirectory();
  }
}