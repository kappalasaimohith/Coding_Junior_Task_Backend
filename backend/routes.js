import express from 'express';
import { runCodeInDocker } from './codeRunner.js';

const router = express.Router();

router.post('/execute-python', async (req, res) => {
  const { code } = req.body;
  try {
    const output = await runCodeInDocker('python', code);
    res.json(output);
  } catch (error) {
    console.error('Error executing Python:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

router.post('/execute-go', async (req, res) => {
  const { code } = req.body;
  try {
    const output = await runCodeInDocker('go', code);
    res.json(output);
  } catch (error) {
    console.error('Error executing Go:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

router.post('/execute-php', async (req, res) => {
  const { code } = req.body;
  try {
    const output = await runCodeInDocker('php', code);
    res.json(output);
  } catch (error) {
    console.error('Error executing PHP:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

router.post('/execute-rust', async (req, res) => {
  const { code } = req.body;
  try {
    const output = await runCodeInDocker('rust', code);
    res.json(output);
  } catch (error) {
    console.error('Error executing Rust:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

router.post('/execute-cpp', async (req, res) => {
  const { code } = req.body;
  try {
    const output = await runCodeInDocker('cpp', code);
    res.json(output);
  } catch (error) {
    console.error('Error executing C++:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

router.post('/execute-javascript', async (req, res) => {
  const { code } = req.body;
  try {
    const output = await runCodeInDocker('javascript', code);
    res.json(output);
  } catch (error) {
    console.error('Error executing JavaScript:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

router.post('/execute-swift', async (req, res) => {
  const { code } = req.body;
  try {
    const output = await runCodeInDocker('swift', code);
    res.json(output);
  } catch (error) {
    console.error('Error executing Swift:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

export { router as routes };
