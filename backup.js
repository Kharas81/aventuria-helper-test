const fs = require('fs');
const path = require('path');

// Einstellungen: Welche Ordner und Dateitypen sollen ins Backup?
const config = {
    outputFile: 'PROJEKT_BACKUP.md',
    includeExtensions: ['.js', '.html', '.css', '.json'],
    excludeFolders: ['node_modules', '.git']
};

let combinedContent = `# 🛡️ Aventuria Projekt-Backup - ${new Date().toLocaleString()}\n\n`;

function readDirRecursive(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!config.excludeFolders.includes(file)) {
                readDirRecursive(filePath);
            }
        } else {
            const ext = path.extname(file);
            if (config.includeExtensions.includes(ext) && file !== config.outputFile && file !== 'backup.js') {
                const content = fs.readFileSync(filePath, 'utf8');
                const relativePath = path.relative(process.cwd(), filePath);
                
                combinedContent += `## 📄 Datei: ${relativePath}\n`;
                combinedContent += `\`\`\`${ext.replace('.', '')}\n${content}\n\`\`\`\n\n---\n\n`;
            }
        }
    });
}

console.log("🚀 Erstelle Backup...");
readDirRecursive(process.cwd());
fs.writeFileSync(config.outputFile, combinedContent);
console.log(`✅ Fertig! Dein Backup liegt in: ${config.outputFile}`);
