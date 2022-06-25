import EventEmitter from 'events';
import { cwd } from 'process';
import { argv, chdir, exit, stdin as input, stdout as output } from 'process';
import { 
  handleAdd,
  handleLine,
  handleCat,
  handleLs,
  handleUp,
  handleCd,
  handleRn,
  handleRm,
  handleOs,
  handleHash,
  handleCompress,
  handleDecompress,
  handleCp,
  handleMv,
  } from './handlers/index.js';
import { displayCurrentDirectory } from './helpers/displayCurrentDirectory.js';
import readline from 'readline';

chdir(cwd());

const args = Object.fromEntries(
  argv.slice(2).map((arg) => {
    const [key, value] = arg.split('=');
    return [key, value];
  })
);
const username = args['--username'] ? args['--username'] : 'stranger';

console.log(`Welcome to File Manager, ${username}`);
displayCurrentDirectory();

const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(0);

eventEmitter
  .on('add', handleAdd)
  .on('cat', handleCat) 
  .on('ls', handleLs)
  .on('up', handleUp)
  .on('cd', handleCd)
  .on('rn', handleRn) 
  .on('rm', handleRm)
  .on('os', handleOs)
  .on('hash', handleHash) 
  .on('compress', handleCompress) //
  .on('decompress', handleDecompress)
  .on('cp', handleCp)
  .on('mv', handleMv)

const rl = readline.createInterface({
  input, 
  output,
});

rl.on('line', handleLine.bind(rl,eventEmitter))
  .on('SIGINT', () => rl.close())
  .on('close', () => {
    console.log(`Thank you for using File Manager ${username}!`)
    process.nextTick(() => exit());
  });