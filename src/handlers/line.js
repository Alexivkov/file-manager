export async function handleLine(eventEmitter, line) {
  try {
    line = line.trim();
    let [command, ...args] = line.split(' ');

    if (['cd','cat','add','rm','os','hash'].includes(command) && args.length === 1) {
      console.log('cd','cat','add','rm','os','hash');
      eventEmitter.emit(command, args);
      console.log('command=', command);
      console.log('args=', args)
    } else if(['rn','cp','mv','compress','decompress'].includes(command) && args.length === 2){
      console.log(args)
      eventEmitter.emit(command, args);
    } else if (['ls', 'up'].includes(line)) {
      console.log('lsup+', command)
      eventEmitter.emit(command);
    } else if (command === '.exit') {
      this.close();
    } else {
      throw new Error('Invalid input');
    }
  } catch (error) {
    console.error(error.message);
  }
}