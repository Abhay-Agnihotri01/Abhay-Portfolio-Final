/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import defaultPortfolioData from '@src/data/defaultPortfolioData';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'portfolio-content.json');

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      return res.status(200).json(JSON.parse(fileData));
    }
  } catch (err) {
    console.error('Error reading portfolio-content.json:', err);
  }

  return res.status(200).json(defaultPortfolioData);
}
