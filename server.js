import { serve } from 'bun';

const server = serve({
    port: 3002,
    fetch(req) {
        const url = new URL(req.url);
        let path = url.pathname;
        
        // Serve index.html for the root path
        if (path === '/') {
            path = '/index.html';
        }
        
        // Set appropriate content type based on file extension
        const contentType = getContentType(path);
        
        // Try to serve the file from the public directory
        try {
            const file = Bun.file(`./public${path}`);
            return new Response(file, {
                headers: {
                    'Content-Type': contentType
                }
            });
        } catch (error) {
            console.error(`Error serving ${path}:`, error);
            // Return 404 if file not found
            return new Response('Not Found', { status: 404 });
        }
    },
});

// Helper function to determine content type
function getContentType(path) {
    const extension = path.split('.').pop().toLowerCase();
    const contentTypes = {
        'html': 'text/html',
        'css': 'text/css',
        'js': 'application/javascript',
        'json': 'application/json',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'ico': 'image/x-icon'
    };
    
    return contentTypes[extension] || 'text/plain';
}

console.log(`Server running at http://localhost:${server.port}`);
