export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body || {};

    if (username === 'abhay' && password === 'abhay') {
      // In a production app, this would be a signed JWT or session cookie.
      // Here we provide a secure verification token.
      const token = `token_abhay_authenticated_${Date.now()}`;
      return res.status(200).json({
        success: true,
        token,
        user: {
          username: 'abhay',
          name: 'Abhay Agnihotri',
          role: 'Administrator'
        }
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Invalid credentials. Please enter username: abhay and password: abhay.'
    });
  }

  if (req.method === 'GET') {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.includes('token_abhay_authenticated_')) {
      return res.status(200).json({
        authenticated: true,
        user: {
          username: 'abhay',
          name: 'Abhay Agnihotri',
          role: 'Administrator'
        }
      });
    }
    return res.status(401).json({ authenticated: false });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
