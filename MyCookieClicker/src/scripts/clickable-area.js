import CookieIMG from "../assets/cookie.png";
import CrunchSound from "../assets/crunch.mp4";

export class ClickableArea {
  gameElement = null;
  onClick = null;

  constructor(gameElement, onClick) {
    this.gameElement = gameElement;
    this.onClick = onClick;
  }

  render(container = this.gameElement) {
    // On crée un nouvel élément du DOM.
    this.clickableAreaElement = document.createElement("section");
    this.clickableAreaElement.id = "game-clickable-area";
    // On modifie son HTML.
    this.clickableAreaElement.innerHTML = `
        <img id="cookie" src=${CookieIMG} width="256px" height="256px" alt="An awesome cookie." />
    `;
    // On ajoute un listener sur l'évènement "click" à l'élément.
    this.clickableAreaElement.addEventListener("click", () => {
      const audio = new Audio(CrunchSound);
      audio.play();
      const cookieElement = this.clickableAreaElement.querySelector("#cookie");
      if (cookieElement) {
        // Ajoute la classe "active" pour agrandir le cookie
        cookieElement.classList.add("active");
        setTimeout(() => {
          // Retire la classe "active" après l'animationrefait le front po
          cookieElement.classList.remove("active");
        }, 100);
      }
      this.onClick();
    });
    // Il faut ajouter l'élément au DOM pour pouvoir le voir
    // On l'ajoute donc à notre élément Game.
    container.append(this.clickableAreaElement);
  }
}
