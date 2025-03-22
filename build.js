import nunjucks from 'nunjucks';
import fsExtra from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import fastGlob from 'fast-glob';

// ES Module compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
    srcDir: path.join(__dirname, 'src'),
    distDir: path.join(__dirname, 'dist'),
    publicDir: path.join(__dirname, 'public'),
    templatesDir: path.join(__dirname, 'src/templates'),
    pagesDir: path.join(__dirname, 'src/templates/pages')
};

// Setup Nunjucks environment
const njkEnv = nunjucks.configure(config.templatesDir, {
    autoescape: true,
    noCache: true
});

// Default global data for all templates
const globalData = {
    siteName: "My Nunjucks Site",
    description: "A static site built with Nunjucks templates",
    copyright: "© 2025 My Website. All rights reserved.",
    socialLinks: [
        { name: "Twitter", url: "https://twitter.com/" },
        { name: "Facebook", url: "https://facebook.com/" },
        { name: "Instagram", url: "https://instagram.com/" }
    ]
};

/**
 * Discovers all page templates
 * @returns {Promise<Array>} Array of page objects with template and output properties
 */
async function discoverPages() {
    const pageFiles = await fastGlob('**/*.html', { cwd: config.pagesDir });
    
    return pageFiles.map(file => {
        // Output path is the same as the input path
        const outputPath = file;
        
        // Basic page data
        const pageData = {
            title: getDefaultTitle(file),
            activeRoute: getActiveRoute(file)
        };
        
        return {
            template: file,
            output: outputPath,
            data: pageData
        };
    });
}

/**
 * Extract a default title from the file path
 * @param {string} filePath The template file path
 * @returns {string} A title based on the file name
 */
function getDefaultTitle(filePath) {
    // Get the file name without extension
    let title = path.basename(filePath, '.html');
    
    // If it's an index file, use the parent directory name
    if (title === 'index') {
        const dir = path.dirname(filePath);
        title = dir === '.' ? 'Home' : dir.split('/').pop();
    }
    
    // Capitalize and clean up the title
    return title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, ' ');
}

/**
 * Extract an active route identifier from the file path
 * @param {string} filePath The template file path
 * @returns {string} An identifier for the active route
 */
function getActiveRoute(filePath) {
    if (filePath === 'index.html') return 'home';
    
    const dir = path.dirname(filePath);
    if (dir === '.') {
        return path.basename(filePath, '.html');
    }
    return dir.split('/')[0];
}

/**
 * Builds a single page from a template
 * @param {Object} page Page definition
 */
function buildPage(page) {
    console.log(`Building: ${page.template} -> ${page.output}`);
    
    try {
        // Combine global data with page-specific data
        const data = { ...globalData, ...page.data };
        
        // Render the template
        const templatePath = path.join('pages', page.template);
        const html = njkEnv.render(templatePath, data);
        
        // Ensure output directory exists
        const outputPath = path.join(config.distDir, page.output);
        const outputDir = path.dirname(outputPath);
        fsExtra.ensureDirSync(outputDir);
        
        // Write the HTML file
        fsExtra.writeFileSync(outputPath, html);
        console.log(`Built: ${page.output}`);
    } catch (err) {
        console.error(`Error building ${page.template}:`, err);
    }
}

/**
 * Builds all pages
 */
async function buildAllPages() {
    console.log('Building pages...');
    
    // Ensure dist directory exists
    fsExtra.ensureDirSync(config.distDir);
    
    // Discover and build each page
    const pages = await discoverPages();
    
    for (const page of pages) {
        buildPage(page);
    }
    
    // Copy static assets from public to dist
    if (fsExtra.existsSync(config.publicDir)) {
        fsExtra.copySync(config.publicDir, config.distDir, {
            overwrite: true
        });
    }
    
    console.log('Build complete!');
    return pages;
}

// For ES Module compatibility, export as named exports
export { buildPage, buildAllPages, discoverPages, config };

// If this script is run directly, build all pages
if (import.meta.url === `file://${__filename}`) {
    buildAllPages();
}
