import { displayCurrentDirectory } from '../helpers/displayCurrentDirectory.js';
import { OPERATION_FAILED } from "../helpers/constants.js";
import { resolve, parse } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';


export const handleCp = ([pathToFile, pathToNewDirectory]) => {
  try {
    pathToFile = resolve(pathToFile);
    const { base } = parse(pathToFile);
    pathToNewDirectory = resolve(pathToNewDirectory, base);
    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToNewDirectory);
    pipeline(readableStream, writableStream);
    displayCurrentDirectory();
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
}