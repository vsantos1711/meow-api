import { exec } from 'node:child_process';

const command = 'pnpx prisma migrate reset --force';
const options = {
  stdio: 'pipe',
  input: 'Y\n',
};

export function resetDatabase() {
  console.log('CLEANING THE DATABASE');
  exec(command, { ...options, encoding: 'utf8' }, (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      return;
    }
    console.log('Standard output:', stdout);
    console.log('Error output:', stderr);
  }).on('exit', (code) => {
    console.log('Exit code:', code);
  });
}
