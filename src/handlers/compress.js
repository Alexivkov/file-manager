import { createReadStream, createWriteStream } from "fs";
import { parse, resolve } from "path";
import { pipeline } from "stream/promises";
import { createBrotliCompress } from "zlib";
import { displayCurrentDirectory } from '../helpers/displayCurrentDirectory.js';
import { OPERATION_FAILED } from "../helpers/constants.js";
import { isDirectory } from '../helpers/isDirectory.js';
import { isFile } from '../helpers/isFile.js';


export const handleCompress = async ([filePath, destinationPath]) => {
  try {
    const isDir = await isDirectory(destinationPath);
    const isFl = await isFile(filePath);

    if(!isDir) throw new Error('It is not a directory');
    if(!isFl) throw new Error('It is not a file');

    filePath = resolve(filePath);
    const { base } = parse(filePath);
    const fileName = `${base}.br`;
    
    destinationPath = resolve(destinationPath, fileName);

    const readableStream = createReadStream(filePath);
    const writableStream = createWriteStream(destinationPath);
    const brotliDecompress = createBrotliCompress();

    await pipeline(readableStream, brotliDecompress, writableStream);
    displayCurrentDirectory();
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
}