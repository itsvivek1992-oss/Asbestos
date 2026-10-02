const crypto = require('crypto');

// Excludes 0, O, 1, I, L per section 14 of the dev questionnaire.
const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

function randomSegment(length) {
  let out = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i += 1) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

/** Generates a code like AA-7F29K3. Caller is responsible for checking uniqueness against the DB. */
function generateReviewCode() {
  return `AA-${randomSegment(6)}`;
}

module.exports = { generateReviewCode };
