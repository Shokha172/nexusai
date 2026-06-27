import os
import re

mapping = {
    r'\bbg-zinc-950(/[\w]+)?\b': r'bg-background\1',
    r'\bbg-zinc-900(/[\w]+)?\b': r'bg-card\1',
    r'\bbg-zinc-800(/[\w]+)?\b': r'bg-muted\1',
    r'\bbg-zinc-50(/[\w]+)?\b': r'bg-foreground\1',
    r'\btext-zinc-50(/[\w]+)?\b': r'text-foreground\1',
    r'\btext-zinc-300(/[\w]+)?\b': r'text-muted-foreground\1',
    r'\btext-zinc-400(/[\w]+)?\b': r'text-muted-foreground\1',
    r'\btext-zinc-500(/[\w]+)?\b': r'text-muted-foreground\1',
    r'\bborder-zinc-900(/[\w]+)?\b': r'border-border\1',
    r'\bborder-zinc-800(/[\w]+)?\b': r'border-border\1',
    r'\bborder-zinc-700(/[\w]+)?\b': r'border-border\1',
    r'\bhover:bg-zinc-900\b': r'hover:bg-accent',
    r'\bhover:bg-zinc-800\b': r'hover:bg-accent',
    r'\bhover:text-zinc-50\b': r'hover:text-foreground',
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for pattern, replacement in mapping.items():
        new_content = re.sub(pattern, replacement, new_content)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

