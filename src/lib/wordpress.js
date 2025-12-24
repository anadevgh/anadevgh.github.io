const WP_API_URL = 'https://www.ipoint.com.mt/blog/wp-json/wp/v2';
let cache = null;
let cacheTime = 0;

export async function getLatestPosts(limit = 8) {
    const now = Date.now();
    if (cache && now - cacheTime < 60 * 1000) { // 1 minute cache
        return cache;
    }

    const res = await fetch(
        `${WP_API_URL}/posts?per_page=${limit}&_embed`
    );
    const posts = await res.json();
    const totalPosts = parseInt(res.headers.get('X-WP-Total'), 10);

    cache = { posts, totalPosts };
    cacheTime = now;

    return cache;
}

export async function getPostsPage({ limit = 12, offset = 0 } = {}) {
  const res = await fetch(`${WP_API_URL}/posts?per_page=${limit}&offset=${offset}&_embed`);
  const posts = await res.json();
  const totalPosts = parseInt(res.headers.get('X-WP-Total'), 10);
  
  return { posts, totalPosts };
}

export async function getAllPosts() {
  const res = await fetch(`${WP_API_URL}/posts?per_page=100&_embed`);
  const data = await res.json();
  return data;
}

export async function getPostBySlug(slug) {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`);
    const data = await res.json();
    return data.length ? data[0] : null;
}

export async function formatPostDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} - ${month} - ${day}`;
}

export function getPaginationRange(current, total, delta = 1) {
    const range = [];
    const rangeWithDots = [];
    let last;

    for (let i = 1; i <= total; i++) {
        if (
            i === 1 ||
            i === total ||
            (i >= current - delta && i <= current + delta)
        ) {
            range.push(i);
        }
    }

    for (const i of range) {
        if (last) {
            if (i - last === 2) {
                rangeWithDots.push(last + 1);
            } else if (i - last > 2) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        last = i;
    }

    return rangeWithDots;
}