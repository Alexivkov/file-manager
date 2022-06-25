import { pipeline } from 'stream/promises';
import { displayCurrentDirectory } from '../helpers/displayCurrentDirectory.js';
import { OPERATION_FAILED } from "../helpers/constants.js";
import { isFile } from "../helpers/isFile.js";
import { isDirectory } from "../helpers/isDirectory.js";
import { resolve, parse } from 'path';
import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";


export async function handleDecompress([filePath, destinationPath]) {
  try {
    const isDir = await isDirectory(destinationPath);
    const isFl = await isFile(filePath);

    if(!isDir) throw new Error('It is not a directory');
    if(!isFl) throw new Error('It is not a file');

    filePath = resolve(filePath);
    const { name, ext } = parse(filePath);

    if(!ext.includes('.br')) throw new Error('Invalid file extension');

    destinationPath = resolve(destinationPath, name);

    const readableStream = createReadStream(filePath);
    const writableStream = createWriteStream(destinationPath);
    const brotliDecompress = createBrotliDecompress();
    await pipeline(readableStream, brotliDecompress, writableStream);
    displayCurrentDirectory();
  } catch (error){
      console.error(OPERATION_FAILED);
  }
}