/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import defaultPortfolioData from '@src/data/defaultPortfolioData';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'portfolio-content.json');

function readPortfolioData() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error('Error reading portfolio-content.json:', err);
  }
  return defaultPortfolioData;
}

function writePortfolioData(data) {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing portfolio-content.json:', err);
    return false;
  }
}

export default function handler(req, res) {
  // Allow GET to read content
  if (req.method === 'GET') {
    const data = readPortfolioData();
    return res.status(200).json(data);
  }

  // Handle saving new content
  if (req.method === 'POST' || req.method === 'PUT') {
    const authHeader = req.headers.authorization;
    // Allow either token header or token in body
    const token = req.body?.token || (authHeader ? authHeader.replace('Bearer ', '') : '');

    if (!token || !token.includes('token_abhay_authenticated_')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized. Please login again.'
      });
    }

    const newContent = req.body?.content || req.body;
    if (!newContent || typeof newContent !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Invalid content payload.'
      });
    }

    // Ensure we keep valid structure
    const updatedData = {
      profile: newContent.profile || defaultPortfolioData.profile,
      stats: Array.isArray(newContent.stats) ? newContent.stats : defaultPortfolioData.stats,
      projects: Array.isArray(newContent.projects) ? newContent.projects : defaultPortfolioData.projects,
      experience: Array.isArray(newContent.experience) ? newContent.experience : defaultPortfolioData.experience,
      credentials: newContent.credentials || defaultPortfolioData.credentials,
      services: Array.isArray(newContent.services) ? newContent.services : defaultPortfolioData.services,
      process: Array.isArray(newContent.process) ? newContent.process : defaultPortfolioData.process,
      socialLinks: Array.isArray(newContent.socialLinks) ? newContent.socialLinks : defaultPortfolioData.socialLinks
    };

    const saved = writePortfolioData(updatedData);
    if (!saved) {
      return res.status(500).json({
        success: false,
        error: 'Failed to write content to storage.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Portfolio updated successfully!',
      data: updatedData
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
