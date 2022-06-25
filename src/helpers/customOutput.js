import { Writable, finished } from 'stream';
import { promisify } from 'util';

export const finishedAsync = promisify(finished);

export function customOutput() {
  console.log('CU')
  return new Writable({
    decodeStrings: false, 
    write(chunk, _, callback) {
      console.log(chunk);
      callback();
    },
  })
}