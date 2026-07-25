const fs = require('fs');

const ptBR = JSON.parse(fs.readFileSync('messages/pt-BR.json', 'utf8'));

const englishPatterns = [
  /\bSelect\b/i, /\bChoose\b/i, /\bManage\b/i, /\bCreate\b/i, /\bDelete\b/i,
  /\bEdit\b/i, /\bCancel\b/i, /\bSave\b/i, /\bUpdate\b/i, /\bView\b/i,
  /\bSearch\b/i, /\bFailed to\b/i, /\bCould not\b/i, /\bNo \w+ yet\b/i,
  /\bOverview\b/i, /\bSettings\b/i, /\bAccount\b/i, /\bRequired\b/i,
  /\bBack to\b/i, /\bSubmit\b/i, /\bRemove\b/i, /\bAdd \w+\b/i
];

function scanObject(obj, path = '') {
  const issues = [];
  for (const [key, val] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    if (typeof val === 'string') {
      for (const pattern of englishPatterns) {
        if (pattern.test(val)) {
          issues.push({ path: currentPath, text: val });
          break;
        }
      }
    } else if (typeof val === 'object' && val !== null) {
      issues.push(...scanObject(val, currentPath));
    }
  }
  return issues;
}

const found = scanObject(ptBR);
console.log(`Found ${found.length} strings that still contain English words:`);
found.forEach((item, index) => {
  console.log(`${index + 1}. [${item.path}]: "${item.text}"`);
});
