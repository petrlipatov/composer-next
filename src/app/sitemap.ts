import { MetadataRoute } from 'next'
import { PIECES, PROJECTS } from '@/shared/constants/content'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://lizatikhonova.com';

  const piecesRoutes = PIECES.map((piece) => ({
    url: `${siteUrl}/pieces/${encodeURIComponent(piece.title.toLowerCase().replace(/ /g, '-'))}`,
    lastModified: new Date(),
  }));

  const projectsRoutes = PROJECTS.map((project) => ({
    url: `${siteUrl}/work/${encodeURIComponent(project.title.toLowerCase().replace(/ /g, '-'))}`,
    lastModified: new Date(),
  }));
 
  const routes = ['', '/info', '/pieces', '/work'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
 
  return [...routes, ...piecesRoutes, ...projectsRoutes];
}