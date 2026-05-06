const acervo = [
  {
    titulo: "Apresentação do Coral Municipal",
    descricao: "Apresentação de encerramento do projeto Canto e Cultura, julho de 2024.",
    imagem: "https://picsum.photos/seed/coral/400/300",
    data: "Julho 2024",
    categoria: "eventos"
  },
  {
    titulo: "Exposição de Artesanato Regional",
    descricao: "Mostra anual de artesanato com peças de cerâmica e bordado feitas por artesãs locais.",
    imagem: "https://picsum.photos/seed/artesanato/400/300",
    data: "Março 2024",
    categoria: "fotografias"
  },
  {
    titulo: "Oficina de Pintura Infantil",
    descricao: "Crianças da comunidade participando da oficina de pintura com tinta acrílica.",
    imagem: "https://picsum.photos/seed/pintura/400/300",
    data: "Outubro 2023",
    categoria: "eventos"
  },
  {
    titulo: "Festival de Música Popular",
    descricao: "Segunda edição do festival que reúne músicos locais na praça central.",
    imagem: "https://picsum.photos/seed/musica/400/300",
    data: "Janeiro 2024",
    categoria: "fotografias"
  },
  {
    titulo: "Registro de Fundação",
    descricao: "Ata de fundação da Associação Cultural Florescer, assinada pelos membros fundadores.",
    imagem: "https://picsum.photos/seed/documento/400/300",
    data: "Março 2010",
    categoria: "documentos"
  },
  {
    titulo: "Mostra de Cinema Local",
    descricao: "Exibições de curtas-metragens produzidos por cineastas da região.",
    imagem: "https://picsum.photos/seed/cinema/400/300",
    data: "Maio 2024",
    categoria: "eventos"
  },
  {
    titulo: "Feira de Artes e Sabores",
    descricao: "Evento que reuniu arte, gastronomia e música ao vivo na sede da associação.",
    imagem: "https://picsum.photos/seed/feira/400/300",
    data: "Setembro 2024",
    categoria: "fotografias"
  },
  {
    titulo: "Relatório Anual 2023",
    descricao: "Relatório de atividades da associação referente ao exercício de 2023.",
    imagem: "https://picsum.photos/seed/relatorio/400/300",
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