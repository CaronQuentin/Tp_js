import NetflixSound from "../assets/netflix_sound.mp3";
import Continue from "../assets/continue.mp3";
import "../styles/style.css";
import { Game } from "./game";

const saveExists = !!localStorage.getItem("cookieClickerSave");
document.querySelector("#app").innerHTML = `
  <div id="menu" style="text-align:center; padding:2rem;">
    <h1>Cookie Clicker</h1>
    <button id="new-game">New Game</button>
    <button id="continue"${!saveExists ? " disabled" : ""}>Continue</button>
  </div>
`;

document.getElementById("new-game").addEventListener("click", () => {
  localStorage.removeItem("cookieClickerSave");
  startGame(false);
});
if (saveExists) {
  document.getElementById("continue").addEventListener("click", () => {
    startGame(true);
  });
}

function startGame(continueSaved) {

  const audio = new Audio(continueSaved ? Continue : NetflixSound);
  audio.play();
  document.querySelector("#app").innerHTML = `<main id="game"></main>`;
  const initCookies = continueSaved ? 0 : 0;
  const game = new Game({ cookies: initCookies });
  game.start();
}
