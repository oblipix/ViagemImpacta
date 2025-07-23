// Função utilitária para gerar URLs de imagens aleatórias
export function generateRandomImageUrl(id, width = 500, height = 350) {
  return `https://picsum.photos/id/${id % 1000}/${width}/${height + 100}`;
}
