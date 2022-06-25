import { cpus, userInfo, EOL } from "os";
import { displayCurrentDirectory } from '../helpers/displayCurrentDirectory.js';
import { OPERATION_FAILED } from "../helpers/constants.js";
import { arch } from 'process';

export const handleOs = async ([param]) => {
  try {
    if(!param) throw new Error('Parameter is not specified');
    const { username, homedir } = userInfo();
    const cpusInfo = cpus().map(({ model, speed }) => ({
      model, 
      speed: `${speed / 1000}GHz`
    }));
    const osInfo = {
      '--EOL': JSON.stringify(EOL),
      '--cpus': cpusInfo,
      '--homedir': homedir,
      '--username': username,
      '--architecture': arch,
    };
    if (!osInfo[param]) throw new Error('No such parameter');

    console.table(osInfo[param]);
    displayCurrentDirectory();
  } catch (error) {
    console.log(OPERATION_FAILED);
  }
}