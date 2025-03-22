import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import nodeWatch from 'node-watch';
import sirv from 'sirv-cli';
import { createServer } from 'http';

// ES Module compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const distDir = path.join(__dirname, 'dist');
const srcDir = path.join(__dirname, 'src');
const publicDir = path.join(__dirname, 'public');

// Function to build the site
function buildSite() {
    console.log('Building site...');
    
    return new Promise((resolve, reject) => {
        const build = spawn('node', ['build.js']);
        
        build.stdout.on('data', (data) => {
            process.stdout.write(`${data}`);
        });
        
        build.stderr.on('data', (data) => {
            process.stderr.write(`${data}`);
        });
        
        build.on('close', (code) => {
            if (code === 0) {
                console.log('Build complete');
                resolve();
            } else {
                console.error(`Build failed with code ${code}`);
                reject();
            }
        });
    });
}

// Create the server and start watching files
async function startServer() {
    try {
        // Initial build
        await buildSite();
        
        // Start sirv static file server
        const sirvHandler = sirv(distDir, {
            dev: true, // Enable dev mode for pretty errors
            etag: true, // Enable ETag generation
            single: true, // Serve index.html for missing paths (SPA support)
            onNoMatch: (req, res) => {
                res.statusCode = 404;
                res.end('Not found');
            }
        });
        
        // Create server
        const server = createServer(sirvHandler);
        server.listen(3003, () => {
            console.log('Server running at http://localhost:3000');
        });
        
        // Set up file watching
        console.log('Watching for file changes...');
        
        // Using node-watch which is simpler and more reliable
        nodeWatch([srcDir, publicDir], { recursive: true }, async (evt, filename) => {
            console.log(`Change detected: ${filename}`);
            try {
                await buildSite();
                console.log('Files rebuilt, refresh your browser');
            } catch (err) {
                console.error('Error rebuilding files');
            }
        });
        
        console.log('Press Ctrl+C to stop');
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

// Start the server
startServer();
