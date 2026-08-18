const fs = require('fs');
const file = 'c:/Users/mlmma/OneDrive/Documents/GitHub/YardStock/frontend/src/components/Dashboard/learn/data.ts';
let content = fs.readFileSync(file, 'utf8');

const imports = "import realEstateImg from './images/real_estate.png'\nimport constructionImg from './images/construction.png'\nimport businessImg from './images/business.png'\nimport marketingImg from './images/marketing.png'\nimport financeImg from './images/finance.png'\nimport technologyImg from './images/technology.png'\nimport designImg from './images/design.png'\n\n";

content = imports + content;

content = content.replace(/category:\s*'([^']+)'([\s\S]*?)image:\s*'[^']+'/g, "category: '$1'$2image: $1ImgVar");

content = content.replace(/real-estateImgVar/g, 'realEstateImg');
content = content.replace(/constructionImgVar/g, 'constructionImg');
content = content.replace(/businessImgVar/g, 'businessImg');
content = content.replace(/marketingImgVar/g, 'marketingImg');
content = content.replace(/financeImgVar/g, 'financeImg');
content = content.replace(/technologyImgVar/g, 'technologyImg');
content = content.replace(/designImgVar/g, 'designImg');

fs.writeFileSync(file, content);
console.log('done');
