/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
};

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

function verifyToken(req) {
  const authHeader = req.headers.authorization;
  const token = req.body?.token || (authHeader ? authHeader.replace('Bearer ', '') : '');
  return token && token.includes('token_abhay_authenticated_');
}

export default function handler(req, res) {
  ensureUploadsDir();

  // GET: List uploaded images
  if (req.method === 'GET') {
    try {
      const files = fs.readdirSync(UPLOADS_DIR)
        .filter((file) => !file.startsWith('.') && /\.(png|jpe?g|webp|gif|svg)$/i.test(file))
        .map((file) => {
          const filePath = path.join(UPLOADS_DIR, file);
          const stats = fs.statSync(filePath);
          return {
            name: file,
            url: `/uploads/${file}`,
            size: stats.size,
            mtime: stats.mtimeMs,
          };
        })
        .sort((a, b) => b.mtime - a.mtime);

      return res.status(200).json({ success: true, files });
    } catch (err) {
      console.error('Failed to list uploaded images:', err);
      return res.status(500).json({ success: false, error: 'Failed to read media library.' });
    }
  }

  // Auth required for POST and DELETE
  if (!verifyToken(req)) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Please login again to upload media.',
    });
  }

  // POST: Upload an image file (base64)
  if (req.method === 'POST') {
    try {
      const { filename, data } = req.body || {};

      if (!data) {
        return res.status(400).json({
          success: false,
          error: 'No image data was received.',
        });
      }

      // Check base64 format and parse extension
      let extension = 'png';
      let base64Content = data;

      const matches = data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const mime = matches[1].toLowerCase();
        base64Content = matches[2];

        if (mime.includes('png')) extension = 'png';
        else if (mime.includes('jpeg') || mime.includes('jpg')) extension = 'jpg';
        else if (mime.includes('webp')) extension = 'webp';
        else if (mime.includes('svg')) extension = 'svg';
        else if (mime.includes('gif')) extension = 'gif';
      } else {
        // Try to deduce extension from filename
        const extMatch = (filename || '').match(/\.([a-zA-Z0-9]+)$/);
        if (extMatch) {
          extension = extMatch[1].toLowerCase();
        }
      }

      const buffer = Buffer.from(base64Content, 'base64');

      // Sanitize base name
      const originalName = (filename || 'photo')
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9-_]/g, '_')
        .substring(0, 35);

      const uniqueFilename = `${originalName}_${Date.now()}.${extension}`;
      const targetPath = path.join(UPLOADS_DIR, uniqueFilename);

      fs.writeFileSync(targetPath, buffer);

      const publicUrl = `/uploads/${uniqueFilename}`;

      return res.status(200).json({
        success: true,
        url: publicUrl,
        filename: uniqueFilename,
        size: buffer.length,
      });
    } catch (err) {
      console.error('Error saving uploaded file:', err);
      return res.status(500).json({
        success: false,
        error: `Upload processing failed: ${err.message}`,
      });
    }
  }

  // DELETE: Remove an uploaded file
  if (req.method === 'DELETE') {
    try {
      const { filename } = req.body || {};
      if (!filename) {
        return res.status(400).json({ success: false, error: 'Filename is required.' });
      }

      const safeName = path.basename(filename);
      const targetPath = path.join(UPLOADS_DIR, safeName);

      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
        return res.status(200).json({ success: true, message: 'File deleted.' });
      }

      return res.status(404).json({ success: false, error: 'File not found.' });
    } catch (err) {
      console.error('Error deleting file:', err);
      return res.status(500).json({ success: false, error: 'Failed to delete file.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
