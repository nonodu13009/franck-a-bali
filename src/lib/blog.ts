import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export type BlogPost = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
    lang: string;
    content: string;
};

export function getAllPosts(locale: string): BlogPost[] {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug: fileName.replace(/\.md$/, ''),
            content,
            ...(data as { title: string; date: string; excerpt: string; coverImage: string; lang: string }),
        };
    });

    // Filter by locale and sort by date
    return allPostsData
        .filter((post) => post.lang === locale)
        .sort((a, b) => {
            if (a.date < b.date) {
                return 1;
            } else {
                return -1;
            }
        });
}

export function getPostBySlug(slug: string, locale: string): BlogPost | undefined {
    // We need to find the file that matches the slug (which might include -en or -fr suffix in filename but we want clean URLs)
    // Actually, for simplicity, let's assume the slug in the URL IS the filename without extension.
    // But since we have bali-en.md and bali-fr.md, we might want the URL to be /blog/bali.
    // So we need to map /blog/bali to bali-{locale}.md.

    const realSlug = `${slug}-${locale}`;
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        return undefined;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        content,
        ...(data as { title: string; date: string; excerpt: string; coverImage: string; lang: string }),
    };
}
