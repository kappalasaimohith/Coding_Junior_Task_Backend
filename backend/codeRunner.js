import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const runCodeInDocker = (language, code) => {
  return new Promise((resolve, reject) => {
    let dockerCommand = '';
    
    const uniqueFileName = uuidv4();
    const dirPath = '/tmp';
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let fileExtension = '';
    switch (language) {
      case 'python':
        fileExtension = '.py';
        break;
      case 'go':
        fileExtension = '.go';
        break;
      case 'php':
        fileExtension = '.php';
        break;
      case 'rust':
        fileExtension = '.rs';
        break;
      case 'cpp':
        fileExtension = '.cpp';
        break;
      case 'javascript':
        fileExtension = '.js';
        break;
      default:
        reject(new Error('Unsupported language'));
        return;
    }

    const filePath = path.resolve(dirPath, `${uniqueFileName}${fileExtension}`);

    fs.writeFileSync(filePath, code);

    switch (language) {
      case 'python':
        dockerCommand = `docker run --rm -v ${path.dirname(filePath)}:/app python:3.10-slim python /app/${path.basename(filePath)}`;
        break;
      case 'go':
        dockerCommand = `docker run --rm -v ${path.dirname(filePath)}:/app golang:1.20 go run /app/${path.basename(filePath)}`;
        break;
      case 'php':
        dockerCommand = `docker run --rm -v ${path.dirname(filePath)}:/app php:8.0-cli php /app/${path.basename(filePath)}`;
        break;
      case 'rust':
        dockerCommand = `docker run --rm -v ${path.dirname(filePath)}:/app rust:latest sh -c "rustc /app/${path.basename(filePath)} -o /app/main && /app/main"`;
        break;    
      case 'cpp':
        dockerCommand = `docker run --rm -v ${path.dirname(filePath)}:/app gcc:latest sh -c "g++ -o /app/main /app/${path.basename(filePath)} && /app/main"`;
        break;
      case 'javascript':
        dockerCommand = `docker run --rm -v ${path.dirname(filePath)}:/app node:16 node /app/${path.basename(filePath)}`;
        break;
      default:
        reject(new Error('Unsupported language'));
        return;
    }

    exec(dockerCommand, (err, stdout, stderr) => {
      if (stderr) {
        resolve({ output: stderr, isError: true });
      } else if (err) {
        resolve(`Error: ${err.message}`);
      } else {
        resolve({ output: stdout, isError: false });
      }

      fs.unlinkSync(filePath);
    });
  });
};

export { runCodeInDocker };
