export function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function getReceitasSlugs() {
  const receitas = [
    "Frango Grelhado com Legumes",
    "Risoto de Cogumelos",
    "Bolo de Chocolate Vegano",
    "Salmão ao Molho de Limão",
    "Salada Caesar",
    "Smoothie de Frutas Vermelhas",
    "Lasanha à Bolonhesa",
    "Pão de Queijo",
    "Mousse de Maracujá",
    "Strogonoff de Frango",
    "Tapioca com Queijo e Presunto",
    "Brigadeiro Gourmet",
    "Yakisoba",
    "Feijoada Completa",
    "Pizza Margherita",
    "Ceviche de Peixe",
    "Brownie de Chocolate",
    "Pad Thai"
  ]

  return receitas.map(nome => ({
    nome,
    slug: slugify(nome)
  }))
} 