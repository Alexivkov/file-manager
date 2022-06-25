import { cwd } from 'process';

export function displayCurrentDirectory() {
  console.info(`You are currently in ${cwd()}`);
}