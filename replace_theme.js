import fs from 'fs';
import path from 'path';

const mapping = [
    { pattern: /\bbg-zinc-950(\/[\w]+)?\b/g, replacement: 'bg-background$1' },
    { pattern: /\bbg-zinc-900(\/[\w]+)?\b/g, replacement: 'bg-card$1' },
    { pattern: /\bbg-zinc-800(\/[\w]+)?\b/g, replacement: 'bg-muted$1' },
    { pattern: /\bbg-zinc-50(\/[\w]+)?\b/g, replacement: 'bg-foreground$1' },
    { pattern: /\btext-zinc-50(\/[\w]+)?\b/g, replacement: 'text-foreground$1' },
    { pattern: /\btext-zinc-300(\/[\w]+)?\b/g, replacement: 'text-muted-foreground$1' },
    { pattern: /\btext-zinc-400(\/[\w]+)?\b/g, replacement: 'text-muted-foreground$1' },
    { pattern: /\btext-zinc-500(\/[\w]+)?\b/g, replacement: 'text-muted-foreground$1' },
    { pattern: /\bborder-zinc-900(\/[\w]+)?\b/g, replacement: 'border-border$1' },
    { pattern: /\bborder-zinc-800(\/[\w]+)?\b/g, replacement: 'border-border$1' },
    { pattern: /\bborder-zinc-700(\/[\w]+)?\b/g, replacement: 'border-border$1' },
    { pattern: /\bhover:bg-zinc-900\b/g, replacement: 'hover:bg-accent' },
    { pattern: /\bhover:bg-zinc-800\b/g, replacement: 'hover:bg-accent' },
    { pattern: /\bhover:text-zinc-50\b/g, replacement: 'hover:text-foreground' }
];

function processFile(filepath) {
    const content = fs.readFileSync(filepath, 'utf-8');
    let newContent = content;
    
    mapping.forEach(({ pattern, replacement }) => {
        newContent = newContent.replace(pattern, replacement);
    });
    
    if (newContent !== content) {
        fs.writeFileSync(filepath, newContent, 'utf-8');
        console.log(`Updated ${filepath}`);
    }
}

function walkSync(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walkSync(filepath);
        } else if (filepath.endsWith('.tsx')) {
            processFile(filepath);
        }
    }
}

walkSync('src');
