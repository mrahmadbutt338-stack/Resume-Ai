const fs = require('fs');
const path = require('path');
const dir = './frontend/src/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
for(const f of files) {
  let content = fs.readFileSync(path.join(dir, f), 'utf8');
  
  // Create a helper function definition inside the file if not exists
  if (!content.includes('const renderLink = ')) {
    content = content.replace('export default function', `const renderLink = (url) => {
  if (!url) return null;
  const href = url.startsWith('http') ? url : 'https://' + url;
  return <a href={href} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{url}</a>;
};

export default function`);
  }

  // Replace {p.linkedin} with {renderLink(p.linkedin)}
  content = content.replace(/\{p\.linkedin\}/g, '{renderLink(p.linkedin)}');
  content = content.replace(/\{p\.website\}/g, '{renderLink(p.website)}');
  content = content.replace(/\{p\.github\}/g, '{renderLink(p.github)}');

  fs.writeFileSync(path.join(dir, f), content);
}
console.log('Done');
