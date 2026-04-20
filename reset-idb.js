const fs = require('fs');
const file = 'app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /if \(filesLoaded && files\.length < 60\)/,
  'if (filesLoaded && files.length < 62)'
);

fs.writeFileSync(file, code);
