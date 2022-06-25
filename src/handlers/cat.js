import { createReadStream } from "fs";
import { resolve } from "path";
import { cwd } from "process";
import { pipeline } from "stream/promises";
import { displayCurrentDirectory } from '../helpers/displayCurrentDirectory.js';
import { customOutput } from '../helpers/customOutput.js';
import { OPERATION_FAILED } from "../helpers/constants.js";

export const handleCat = async ([rawPath]) => {
  try {
    const currentDirectory = resolve(cwd());
    const filePath = resolve(rawPath);
    const readableStream = createReadStream(filePath, {encoding: 'utf8'});
    await pipeline(readableStream, customOutput());
    displayCurrentDirectory();
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
}