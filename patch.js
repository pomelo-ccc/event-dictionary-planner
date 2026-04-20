const fs = require('fs');
const file = 'components/planner/planner-view.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /if \(!confirm\("确认删除该分组及其下所有函数卡片\?"\)\) return/,
  'if (!window.confirm("确认删除该分组及其下所有函数卡片?")) return'
);

fs.writeFileSync(file, code);
