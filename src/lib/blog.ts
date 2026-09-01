import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  dateModified?: string;
  author: string;
  category: string;
  excerpt: string;
  hero_image?: string;
  // Descrizione della foto e firma dell'autore: servono quando l'immagine
  // arriva da fuori con una licenza che chiede il credito (Creative Commons).
  hero_alt?: string;
  hero_credit?: string;
  hero_credit_url?: string;
  content: string;
}

export function getSortedPostsData(): Omit<PostData, 'content'>[] {
  // Get file names under /src/content/blog
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { data } = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        ...(data as { title: string; date: string; dateModified?: string; author: string; category: string; excerpt: string; hero_image?: string; hero_alt?: string; hero_credit?: string; hero_credit_url?: string }),
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Combine the data with the slug and content
  return {
    slug,
    content,
    ...(data as { title: string; date: string; dateModified?: string; author: string; category: string; excerpt: string; hero_image?: string; hero_alt?: string; hero_credit?: string; hero_credit_url?: string }),
  };
}
