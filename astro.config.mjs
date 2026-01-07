// @ts-check
/*import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://anadevgh.github.io',
});*/

import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
    //site: 'http://localhost:4321',
    output: 'server',
    adapter: vercel()
});