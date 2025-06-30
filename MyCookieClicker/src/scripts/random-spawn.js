import GoldenCookieImg from "../assets/golden-cookie.png";
export function startGoldenCookieSpawns(container, onCollect) {
  const min = 1000, max = 200000; //
  function schedule() {
    const delay = Math.random() * (max - min) + min;
    setTimeout(() => {
      spawn();
      schedule();
    }, delay);
  }
  function spawn() {
    if (!container) return;
    const cookie = document.createElement("img");
    cookie.src = GoldenCookieImg;
    cookie.className = "golden-cookie";
    const rect = container.getBoundingClientRect();
    const size = 64;
    const x = Math.random() * (rect.width - size);
    const y = Math.random() * (rect.height - size);
    Object.assign(cookie.style, {
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}px`,
      top: `${y}px`,
      cursor: "pointer",
      zIndex: 10
    });
    container.append(cookie);
    cookie.addEventListener("click", () => {
      onCollect();
      cookie.remove();
    }, { once: true });
    setTimeout(() => cookie.remove(), 5000);
  }
  schedule();
}
