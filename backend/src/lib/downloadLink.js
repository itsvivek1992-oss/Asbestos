const crypto = require('crypto');

const EXPIRY_HOURS = Number(process.env.DOWNLOAD_LINK_EXPIRY_HOURS || 72);
const MAX_USES = Number(process.env.DOWNLOAD_MAX_USES || 5);

function generateDownloadToken() {
  return crypto.randomBytes(24).toString('hex');
}

function newExpiry() {
  return new Date(Date.now() + EXPIRY_HOURS * 60 * 60 * 1000).toISOString();
}

function buildDownloadUrl(token) {
  const base = process.env.PUBLIC_API_URL || `http://localhost:${process.env.PORT || 4000}`;
  return `${base}/api/download/${token}`;
}

module.exports = { generateDownloadToken, newExpiry, buildDownloadUrl, MAX_USES };
