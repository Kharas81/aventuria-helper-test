import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT_DIR = process.cwd();
const SCHERGEN_DIR = path.join(ROOT_DIR, 'data', 'cards', 'catalog', 'schergen');
const INDEX_PATH = path.join(SCHERGEN_DIR, 'index.json');
const IMAGE_DIR = path.join(ROOT_DIR, 'assets', 'images', 'cards', 'schergen');

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function readJsonFile(filePath) {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
}

function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

function normalizeArray(value) {
    return Array.isArray(value) ? value : [];
}

async function validateIndex() {
    if (!(await fileExists(INDEX_PATH))) {
        throw new Error(`Index-Datei nicht gefunden: ${INDEX_PATH}`);
    }

    const indexData = await readJsonFile(INDEX_PATH);
    const cardFiles = normalizeArray(indexData.cards);

    if (!cardFiles.length) {
        throw new Error('Index-Datei enthält keine Karten.');
    }

    return cardFiles;
}

async function validateCardFile(fileName) {
    const cardPath = path.join(SCHERGEN_DIR, fileName);
    const problems = [];
    const warnings = [];

    if (!(await fileExists(cardPath))) {
        problems.push(`Datei fehlt: ${fileName}`);
        return { fileName, problems, warnings };
    }

    let cardData;
    try {
        cardData = await readJsonFile(cardPath);
    } catch (error) {
        problems.push(`Ungültiges JSON: ${fileName} (${error.message})`);
        return { fileName, problems, warnings };
    }

    if (!isNonEmptyString(cardData.cardName)) {
        problems.push(`cardName fehlt oder ist leer: ${fileName}`);
    }

    if (!isNonEmptyString(cardData.cardType)) {
        problems.push(`cardType fehlt oder ist leer: ${fileName}`);
    }

    if (!isNonEmptyString(cardData.set)) {
        warnings.push(`set fehlt oder ist leer: ${fileName}`);
    }

    if (!isNonEmptyString(cardData.setId)) {
        warnings.push(`setId fehlt oder ist leer: ${fileName}`);
    }

    if (!cardData.stats || typeof cardData.stats !== 'object') {
        warnings.push(`stats fehlt oder ist kein Objekt: ${fileName}`);
    }

    if (!Array.isArray(cardData.actionTable)) {
        warnings.push(`actionTable fehlt oder ist kein Array: ${fileName}`);
    }

    if (isNonEmptyString(cardData.image)) {
        const imagePath = path.join(IMAGE_DIR, cardData.image);
        if (!(await fileExists(imagePath))) {
            problems.push(`Bild fehlt: ${cardData.image} (referenziert in ${fileName})`);
        }
    } else {
        warnings.push(`image fehlt oder ist leer: ${fileName}`);
    }

    return { fileName, problems, warnings };
}

async function main() {
    console.log('Prüfe Schergen-Katalog...');
    console.log(`Projektwurzel: ${ROOT_DIR}`);
    console.log(`Index: ${INDEX_PATH}`);
    console.log('');

    const cardFiles = await validateIndex();
    const results = [];

    for (const fileName of cardFiles) {
        results.push(await validateCardFile(fileName));
    }

    const problemResults = results.filter(result => result.problems.length > 0);
    const warningResults = results.filter(result => result.warnings.length > 0);

    if (!problemResults.length && !warningResults.length) {
        console.log(`OK: ${cardFiles.length} Karten geprüft, keine Probleme gefunden.`);
        return;
    }

    if (problemResults.length) {
        console.log('FEHLER:');
        for (const result of problemResults) {
            for (const problem of result.problems) {
                console.log(`- ${problem}`);
            }
        }
        console.log('');
    }

    if (warningResults.length) {
        console.log('WARNUNGEN:');
        for (const result of warningResults) {
            for (const warning of result.warnings) {
                console.log(`- ${warning}`);
            }
        }
        console.log('');
    }

    console.log(`Geprüfte Karten: ${cardFiles.length}`);
    console.log(`Dateien mit Fehlern: ${problemResults.length}`);
    console.log(`Dateien mit Warnungen: ${warningResults.length}`);

    if (problemResults.length) {
        process.exitCode = 1;
    }
}

main().catch(error => {
    console.error('Katalogprüfung abgebrochen:', error.message);
    process.exitCode = 1;
});
