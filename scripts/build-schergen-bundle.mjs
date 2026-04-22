import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT_DIR = process.cwd();

const INDEX_PATH = path.join(
    ROOT_DIR,
    'data',
    'cards',
    'catalog',
    'schergen',
    'index.json'
);

const SOURCE_DIR = path.join(
    ROOT_DIR,
    'data',
    'cards',
    'catalog',
    'schergen'
);

const OUTPUT_DIR = path.join(
    ROOT_DIR,
    'data',
    'runtime',
    'catalogs'
);

const OUTPUT_PATH = path.join(
    OUTPUT_DIR,
    'schergen.cards.json'
);

async function readJson(filePath) {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
}

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

function normalizeArray(value) {
    return Array.isArray(value) ? value : [];
}

async function main() {
    console.log('Baue Runtime-Bundle für Schergen...');

    const indexData = await readJson(INDEX_PATH);
    const fileNames = normalizeArray(indexData.cards);

    const cards = [];
    const missingFiles = [];

    for (const fileName of fileNames) {
        const sourcePath = path.join(SOURCE_DIR, fileName);

        if (!(await fileExists(sourcePath))) {
            missingFiles.push(fileName);
            continue;
        }

        const rawCard = await readJson(sourcePath);
        cards.push({
            fileName,
            rawCard
        });
    }

    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    const bundle = {
        catalog_key: 'schergen',
        generated_at: new Date().toISOString(),
        card_count: cards.length,
        cards
    };

    await fs.writeFile(
        OUTPUT_PATH,
        JSON.stringify(bundle, null, 2) + '\n',
        'utf8'
    );

    console.log(`Bundle geschrieben: ${OUTPUT_PATH}`);
    console.log(`Enthaltene Karten: ${cards.length}`);

    if (missingFiles.length) {
        console.warn('');
        console.warn('Fehlende Dateien wurden übersprungen:');
        missingFiles.forEach(fileName => {
            console.warn(`- ${fileName}`);
        });

        process.exitCode = 1;
    }
}

main().catch(error => {
    console.error('Fehler beim Erstellen des Bundles:', error.message);
    process.exitCode = 1;
});
