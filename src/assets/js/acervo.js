const acervo = [
  {
    titulo: "Apresentação do Coral Municipal",
    descricao: "Apresentação de encerramento do projeto Canto e Cultura, julho de 2024.",
    imagem: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop",
    data: "Julho 2024",
    categoria: "eventos"
  },
  {
    titulo: "Exposição de Artesanato Regional",
    descricao: "Mostra anual de artesanato com peças de cerâmica e bordado feitas por artesãs locais.",
    imagem: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop",
    data: "Março 2024",
    categoria: "fotografias"
  },
  {
    titulo: "Oficina de Pintura Infantil",
    descricao: "Crianças da comunidade participando da oficina de pintura com tinta acrílica.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    data: "Outubro 2023",
    categoria: "eventos"
  },
  {
    titulo: "Festival de Música Popular",
    descricao: "Segunda edição do festival que reúne músicos locais na praça central.",
    imagem: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop",
    data: "Janeiro 2024",
    categoria: "fotografias"
  },
  {
    titulo: "Registro de Fundação",
    descricao: "Ata de fundação da Associação Cultural Florescer, assinada pelos membros fundadores.",
    imagem: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
    data: "Março 2010",
    categoria: "documentos"
  },
  {
    titulo: "Mostra de Cinema Local",
    descricao: "Exibições de curtas-metragens produzidos por cineastas da região.",
    imagem: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop",
    data: "Maio 2024",
    categoria: "eventos"
  },
  {
    titulo: "Feira de Artes e Sabores",
    descricao: "Evento que reuniu arte, gastronomia e música ao vivo na sede da associação.",
    imagem: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&h=300&fit=crop",
    data: "Setembro 2024",
    categoria: "fotografias"
  },
  {
    titulo: "Relatório Anual 2023",
    descricao: "Relatório de atividades da associação referente ao exercício de 2023.",
    imagem: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    data: "Fevereiro 2024",
    categoria: "documentos"
  }
];

function renderizarAcervo(itens) {
  const gallery = document.getElementById("acervo-gallery");
  if (!gallery) return;

  gallery.innerHTML = itens
    .map(
      (item) => `
      <div class="card">
        <img src="${item.imagem}" alt="${item.titulo}" loading="lazy">
        <div class="card-body">
          <h3>${item.titulo}</h3>
          <p>${item.descricao}</p>
          <p><small>${item.data} · ${item.categoria}</small></p>
        </div>
      </div>
    `
    )
    .join("");
}

renderizarAcervo(acervo);