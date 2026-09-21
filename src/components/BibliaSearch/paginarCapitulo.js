/**
 * Corta os versículos em páginas que cabem de fato na altura dada.
 *
 * A medição acontece dentro do próprio corpo da página, num nó invisível:
 * assim herda fonte, entrelinha e largura reais, sem precisar duplicar
 * estilos aqui.
 */
export function paginarVersos(versos, corpo) {
  if (!corpo || !versos?.length) return [];

  const altura = corpo.clientHeight;
  if (altura <= 0) return [];

  const medidor = document.createElement("div");
  medidor.style.cssText =
    "position:absolute;left:0;right:0;top:0;visibility:hidden;pointer-events:none;";
  corpo.appendChild(medidor);

  const criar = (verso) => {
    const linha = document.createElement("div");
    linha.className = "verso-linha";

    const num = document.createElement("span");
    num.className = "verso-num";
    num.textContent = verso.versiculo;

    const texto = document.createElement("p");
    texto.className = "verso-texto";
    texto.textContent = verso.texto;

    linha.append(num, texto);
    return linha;
  };

  const paginas = [];
  let atual = [];

  for (const verso of versos) {
    const linha = criar(verso);
    medidor.appendChild(linha);

    // Estourou e já havia algo na página: fecha e recomeça com este verso.
    if (medidor.scrollHeight > altura && atual.length > 0) {
      medidor.removeChild(linha);
      paginas.push(atual);
      atual = [];
      medidor.replaceChildren(linha);
    }

    atual.push(verso);
  }

  if (atual.length > 0) paginas.push(atual);

  medidor.remove();
  return paginas;
}

/** Em que folha dupla está um versículo (duas páginas por folha). */
export function spreadDoVersiculo(paginas, numero) {
  const alvo = String(numero);
  const indice = paginas.findIndex((pagina) =>
    pagina.some((v) => String(v.versiculo) === alvo),
  );
  return indice < 0 ? 0 : Math.floor(indice / 2);
}
