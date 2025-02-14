import { getReceitasSlugs } from '../utils/receitas'

const Sitemap = () => null

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://receitas-git-main-purfazzs-projects.vercel.app' // URL atualizada
  
  // Gera as URLs para todas as receitas
  const receitas = getReceitasSlugs()
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${receitas.map(receita => `
        <url>
          <loc>${baseUrl}/receitas/${receita.slug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap 