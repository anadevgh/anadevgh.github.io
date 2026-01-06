// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://anadevgh.github.io',
});

/*import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
    site: 'http://localhost:4321',
    output: 'server', // must be "server" to enable API routes
    adapter: node({
        mode: 'standalone', 
    }),
});*/