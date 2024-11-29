import express from 'express';
import bodyParser from 'body-parser';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const runCodeInDocker = (language, code, filePath) => {
  return new Promise((resolve, reject) => {
    let dockerCommand = '';

    switch (language) {
      case 'python':
        fs.writeFileSync(filePath, code);
        dockerCommand = `docker run --rm -v ${path.dirname(filePath)}:/app python:3.10-slim python /app/${path.basename(filePath)}`;
        break;
      case 'go':
        fs.writeFileSync(filePath, code);
        dockerCommand = `docker run --rm -v ${path.dirname(filePath)}:/app golang:1.20 go run /app/${path.basename(filePath)}`;
        break;
      case 'php':
        fs.writeFileSync(filePath, code);
        dockerCommand = `docker run --rm -v ${path.dirname(filePath)}:/app php:8.0-cli php /app/${path.basename(filePath)}`;
        break;
      case 'rust':
        fs.writeFileSync(filePath, code);
        dockerCommand = `docker run --rm -v ${path.dirname(filePath)}:/app rust:latest sh -c "rustc /app/${path.basename(filePath)} -o /app/main && /app/main"`;
        break;    
      case 'cpp':
        fs.writeFileSync(filePath, code);
        dockerCommand = `docker run --rm -v ${path.dirname(filePath)}:/app gcc:latest sh -c "g++ -o /app/main /app/${path.basename(filePath)} && /app/main"`;
        break;
      case 'javascript':
        fs.writeFileSync(filePath, code);
        console.log("Javascript")
        dockerCommand = `docker run --rm -v ${path.dirname(filePath)}:/app node:16 node /app/${path.basename(filePath)}`;
        break;
      default:
        reject(new Error('Unsupported language'));
        return;
    }

    exec(dockerCommand, (err, stdout, stderr) => {
      if (stderr) {
        // If there's stderr output, resolve with it
        resolve({ output: stderr, isError: true });
      } else if (err) {
        // If there's an error, resolve with the error message
        resolve(`Error: ${err.message}`);
      } else {
        // Otherwise, resolve with the stdout output
        resolve({ output: stdout, isError: false });
      }
    });
  });
};

app.post('/api/execute-python', async (req, res) => {
  const { code } = req.body;
  const filePath = './temp/main.py';
  try {
    const output = await runCodeInDocker('python', code, filePath);
    res.json(output );
  } catch (error) {
    console.error('Error executing Python:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

app.post('/api/execute-go', async (req, res) => {
  const { code } = req.body;
  const filePath = '/tmp/main.go';
  try {
    const output = await runCodeInDocker('go', code, filePath);
    res.json(output );
  } catch (error) {
    console.error('Error executing Go:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

app.post('/api/execute-php', async (req, res) => {
  const { code } = req.body;
  const filePath = '/tmp/main.php';
  try {
    const output = await runCodeInDocker('php', code, filePath);
    res.json(output );
  } catch (error) {
    console.error('Error executing PHP:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

app.post('/api/execute-rust', async (req, res) => {
  const { code } = req.body;
  const filePath = '/tmp/main.rs';
  try {
    const output = await runCodeInDocker('rust', code, filePath);
    res.json(output );
  } catch (error) {
    console.error('Error executing Rust:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

app.post('/api/execute-cpp', async (req, res) => {
  const { code } = req.body;
  const filePath = '/tmp/main.cpp';
  try {
    const output = await runCodeInDocker('cpp', code, filePath);
    res.json(output );
  } catch (error) {
    console.error('Error executing C++:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

app.post('/api/execute-javascript', async (req, res) => {
  const { code } = req.body;
  const filePath = '/tmp/main.js';
  try {
    const output = await runCodeInDocker('javascript', code, filePath);
    res.json(output );
  } catch (error) {
    console.error('Error executing JavaScript:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
