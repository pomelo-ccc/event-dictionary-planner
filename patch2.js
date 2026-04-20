const fs = require('fs');
const file = 'components/dictionary/event-editor-sheet.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /<Input\s+value=\{data\.import_source\}\s+onChange=\{\(e\) => update\("import_source", e.target.value\)\}\s+placeholder="@pdm\/table\/types"\s+\/>/,
  `<Input
                        value={data.import_source}
                        onChange={(e) => update("import_source", e.target.value)}
                        placeholder={\`ng-lc-dpp/\${data.group}\`}
                      />`
);

fs.writeFileSync(file, code);
