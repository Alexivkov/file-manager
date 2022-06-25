import { createReadStream, createWriteStream } from "fs";
import { unlink } from "fs/promises";
import { resolve, parse } from "path";
import { pipeline } from "stream/promises";
import { displayCurrentDirectory } from '../helpers/displayCurrentDirectory.js';
import { OPERATION_FAILED } from "../helpers/constants.js";
import { isDirectory } from "../helpers/isDirectory.js";


export const handleMv = async ([pathToFile, pathToNewDirectory]) => {
  try {
    const isDir = await isDirectory(pathToNewDirectory);
    if (!isDir) throw new Error('Invalid path to new directory');

    pathToFile = resolve(pathToFile);
    const { base } = parse(pathToFile);
    pathToNewDirectory = resolve(pathToNewDirectory, base);
    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToNewDirectory);
    await pipeline(readableStream, writableStream);
    await unlink(pathToFile);

    displayCurrentDirectory();
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
}