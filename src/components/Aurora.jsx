import { useEffect, useRef } from "react";

/**
 * Fundo compartilhado: duas auroras que derivam lentamente e um foco de luz
 * que segue o ponteiro.
 *
 * As auroras são `radial-gradient`, não círculos borrados: um `blur(120px)`
 * sobre 1000px de elemento é um passe de filtro caríssimo a cada quadro, e
 * o degradê dá a mesma queda suave de graça.
 *
 * O foco tem tamanho fixo e se move por `transform` — mexer no `background`
 * de um elemento de tela cheia repinta a tela inteira a cada movimento do
 * mouse; `transform` é composto, não repinta nada.
 */
export default function Aurora() {
  const spotRef = useRef(null);

  useEffect(() => {
    const node = spotRef.current;
    if (!node || window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.3;

    const pintar = () => {
      frame = 0;
      node.style.transform = `translate3d(${x - 520}px, ${y - 520}px, 0)`;
    };
    pintar();

    const handleMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(pintar);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="animate-drift absolute -right-1/4 -top-1/3 size-[70vmax] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgb(255 255 255 / 0.085), rgb(255 255 255 / 0.03) 55%, transparent 78%)",
        }}
      />
      <div
        className="animate-drift absolute -bottom-1/3 -left-1/4 size-[70vmax] rounded-full"
        style={{
          animationDelay: "-9s",
          background:
            "radial-gradient(closest-side, rgb(244 196 48 / 0.19), rgb(244 196 48 / 0.07) 55%, transparent 78%)",
        }}
      />
      <div
        ref={spotRef}
        className="absolute left-0 top-0 hidden size-[1040px] lg:block"
        style={{
          willChange: "transform",
          background:
            "radial-gradient(closest-side, rgb(255 255 255 / 0.06), transparent 65%)",
        }}
      />
    </div>
  );
}
