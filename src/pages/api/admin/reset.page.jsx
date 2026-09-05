/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import defaultPortfolioData from '@src/data/defaultPortfolioData';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'portfolio-content.json');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  const token = req.body?.token || (authHeader ? authHeader.replace('Bearer ', '') : '');

  if (!token || !token.includes('token_abhay_authenticated_')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Please login again.'
    });
  }

  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(defaultPortfolioData, null, 2), 'utf-8');
    return res.status(200).json({
      success: true,
      message: 'Portfolio restored to default data successfully!',
      data: defaultPortfolioData
    });
  } catch (err) {
    console.error('Error resetting portfolio-content.json:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to reset portfolio content.'
    });
  }
}
