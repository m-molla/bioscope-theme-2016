const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const build = path.join(root, 'build');

const copies = [
  ['src/carousel/block.json', 'build/carousel/block.json'],
  ['src/carousel/render.php', 'build/carousel/render.php'],
  ['src/slide/block.json', 'build/slide/block.json'],
];

for (const [from, to] of copies) {
  const source = path.join(root, from);
  const destination = path.join(root, to);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
  console.log(`Copied ${from} -> ${to}`);
}
