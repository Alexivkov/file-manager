import { createHash } from "crypto";
import { createReadStream } from "fs";
import { resolve } from "path";
import { pipeline } from "stream/promises";
import { customOutput } from "../helpers/customOutput.js";
import { displayCurrentDirectory } from '../helpers/displayCurrentDirectory.js';
import { OPERATION_FAILED } from "../helpers/constants.js";

export const handleHash = async ([filePath]) => {
  try {
    filePath = resolve(filePath);
    const hash = createHash('sha256');
    const readableStream = createReadStream(filePath);
    await pipeline(readableStream, hash.setEncoding('hex'), customOutput());
    displayCurrentDirectory();
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
}