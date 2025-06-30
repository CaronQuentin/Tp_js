import { ClickableArea } from "./clickable-area";
import { Shop } from "./shop";
import { startGoldenCookieSpawns } from "./random-spawn";
import "../styles/game.css";

export class Game {
  // Game Properties
  cookies = 0;

  // Game Elements
  gameElement = null;
  scoreElement = null;

  // Game Components
  clickableArea = null;
  shop = null;
  gameArea = null;

  constructor(config) {
    this.cookies = config.cookies;
    this.gameElement = document.querySelector("#game");
    this.clickableArea = new ClickableArea(
      this.gameElement,
      this.onClickableAreaClick
    );
    this.shop = new Shop(this.gameElement, this.onShopPurchase);
    this.load(); // restaure l'état si dispo
  }

  start() {
    this.render();
    startGoldenCookieSpawns(this.gameArea, () => {
      const passiveGain = this.shop.items.reduce(
        (sum, i) => sum + i.effect * i.quantity,
        0
      );
      const maxBonus = Math.floor(passiveGain * 1000) || 1;
      const bonus = Math.floor(Math.random() * maxBonus) + 1;
      this.cookies += bonus;
      this.updateScore();
      this.save();
    });
    this.startPassiveIncome();
  }

  startPassiveIncome() {
    setInterval(() => {
      const passiveIncome = this.shop.items.reduce(
        (total, item) => total + item.effect * item.quantity,
        0
      );
      this.cookies += passiveIncome;
      this.updateScore();
    }, 1000);
  }

  render() {
    // On vide l'élément de jeu existant
    this.gameElement.innerHTML = "";

    // Création du conteneur pour la zone de jeu (score + clickable area)
    const gameArea = document.createElement("div");
    gameArea.id = "game-area";
    this.gameArea = gameArea;
    // Rendu du score dans le conteneur
    this.renderScore(gameArea);
    // Rendu de la zone cliquable dans le conteneur
    this.clickableArea.render(gameArea);
    
    // Ajout du conteneur de jeu à l'élément principal
    this.gameElement.append(gameArea);
    // Rendu du shop (il gèrera lui-même son affichage)
    this.shop.render();
  }

  renderScore(container) {
    this.scoreElement = document.createElement("section");
    this.scoreElement.id = "game-score";
    container.append(this.scoreElement);
    this.updateScore();
  }

  updateScore() {
    const cookiesPerSecond = this.shop.items.reduce(
      (total, item) => total + item.effect * item.quantity,
      0
    );
    this.scoreElement.innerHTML = `
      <div style="font-size:2em; font-weight:bold;">${this.cookies.toFixed(1)} biscuits</div>
      <div style="font-size:0.8em; color:#888;">${cookiesPerSecond.toFixed(1)} biscuits par seconde</div>
    `;
  }

  onClickableAreaClick = () => {
    this.cookies += 1;
    this.updateScore();
    this.save();
  };

  onShopPurchase = (item, quantity) => {
    const totalCost = this.shop.getTotalCost(item);
    if (this.cookies >= totalCost) {
      this.cookies -= totalCost;

      if (this.shop.activeTab === "items") {
        item.quantity += quantity; // Augmente la quantité achetée
        this.shop.updateItemCost(item); // Met à jour le coût de l'item
      } else if (this.shop.activeTab === "bonuses" && !item.applied) {
        this.applyBonus(item); // Applique le bonus
        item.applied = true; // Marque le bonus comme appliqué
      }

      this.shop.updateShopUI(); // Met à jour l'interface utilisateur du shop
      this.updateScore(); // Met à jour le score affiché
      this.save(); // enregistre après achat
      console.log(`Purchased ${item.name}!`);
    } else {
      console.log("Not enough cookies!");
    }
  };

  applyBonus(bonus) {
    if (bonus.name === "Cursor Boost") {
      const cursor = this.shop.items.find((item) => item.name === "Cursor");
      if (cursor) {
        cursor.effect *= 1.3; // Augmente la production des cursors de 30%
      }
    } else if (bonus.name === "Grandma Boost") {
      const grandma = this.shop.items.find((item) => item.name === "Grandma");
      if (grandma) {
        grandma.effect *= 1.2; // Augmente la production des grandmas de 20%
      }
    } else if (bonus.name === "Global Boost") {
      this.shop.items.forEach((item) => {
        item.effect *= 1.1; // Augmente la production de tous les items de 10%
      });
    }
  }

  // Enregistre l'état dans le localStorage
  save() {
    const state = {
      cookies: this.cookies,
      items: this.shop.items.map(i => ({ name: i.name, quantity: i.quantity })),
      bonusesApplied: this.shop.bonuses.filter(b => b.applied).map(b => b.name)
    };
    localStorage.setItem("cookieClickerSave", JSON.stringify(state));
  }

  // Restaure l'état depuis le localStorage
  load() {
    const data = localStorage.getItem("cookieClickerSave");
    if (!data) return;
    let state;
    try { state = JSON.parse(data); } catch { return; }
    this.cookies = state.cookies ?? this.cookies;
    state.items?.forEach(si => {
      const item = this.shop.items.find(i => i.name === si.name);
      if (item) {
        item.quantity = si.quantity;
        this.shop.updateItemCost(item);
      }
    });
    state.bonusesApplied?.forEach(name => {
      const bonus = this.shop.bonuses.find(b => b.name === name);
      if (bonus && !bonus.applied) {
        this.applyBonus(bonus);
        bonus.applied = true;
      }
    });
  }
}