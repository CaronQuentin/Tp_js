export class Shop {
  shopElement = null;
  items = [];
  bonuses = [];
  onPurchase = null;
  purchaseQuantity = 1; // Quantité d'achat par défaut
  activeTab = "items"; // Onglet actif par défaut

  constructor(gameElement, onPurchase) {
    this.gameElement = gameElement;
    this.onPurchase = onPurchase;
    this.items = [
      { name: "Cursor", baseCost: 15, cost: 15, effect: 0.1, quantity: 0, image: "./src/assets/Clicker.png" },
      { name: "Grandma", baseCost: 100, cost: 100, effect: 1, quantity: 0, image: "./src/assets/GrandMere.png" },
      { name: "Grandpa", baseCost: 500, cost: 500, effect: 5, quantity: 0, image: "./src/assets/GrandPere.png" },
      { name: "Plain", baseCost: 3000, cost: 3000, effect: 20, quantity: 0, image: "./src/assets/Plaine.png" },
      { name: "Farm", baseCost: 10000, cost: 10000, effect: 50, quantity: 0, image: "./src/assets/Farm.png" },
      { name: "Factory", baseCost: 50000, cost: 50000, effect: 200, quantity: 0, image: "./src/assets/Factory.png" },
    ];
    this.bonuses = [
      { name: "Cursor Boost", baseCost: 1000, cost: 1000, effect: "30% production for Cursors", applied: false },
      { name: "Grandma Boost", baseCost: 5000, cost: 5000, effect: "20% production for Grandmas", applied: false },
      { name: "Global Boost", baseCost: 20000, cost: 20000, effect: "10% production for all items", applied: false },
    ];
  }

  render() {
    this.shopElement = document.createElement("section");
    this.shopElement.id = "game-shop";
    this.updateShopUI();
    this.shopElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("tab-button")) {
        this.activeTab = event.target.dataset.tab;
        this.updateShopUI();
      } else if (event.target.closest(".shop-item")) {
        const itemName = event.target.closest(".shop-item").dataset.name;
        const list = this.activeTab === "items" ? this.items : this.bonuses;
        const item = list.find((i) => i.name === itemName);
        if (item) {
          if (this.activeTab === "bonuses" && item.applied) {
            console.log(`Bonus "${item.name}" is already applied.`);
            return; // Empêche l'achat si le bonus est déjà appliqué
          }
          this.onPurchase(item, this.purchaseQuantity);
        }
      } else if (event.target.classList.contains("purchase-quantity")) {
        this.purchaseQuantity = parseInt(event.target.dataset.quantity, 10);
        this.updateShopUI();
      }
    });
    this.gameElement.append(this.shopElement);
  }

  updateShopUI() {
    const list = this.activeTab === "items"
      ? this.items
      : this.bonuses.filter(b => !b.applied);
    this.shopElement.innerHTML = `
      <h2>Boutique</h2>
      <div id="tab-buttons">
        <button class="tab-button ${this.activeTab==="items"?"active":""}" data-tab="items">Objets</button>
        <button class="tab-button ${this.activeTab==="bonuses"?"active":""}" data-tab="bonuses">Bonus</button>
      </div>
      ${this.activeTab==="items" ? `
        <div id="purchase-options">
          <button class="purchase-quantity ${this.purchaseQuantity===1?"active":""}" data-quantity="1">x1</button>
          <button class="purchase-quantity ${this.purchaseQuantity===10?"active":""}" data-quantity="10">x10</button>
          <button class="purchase-quantity ${this.purchaseQuantity===100?"active":""}" data-quantity="100">x100</button>
        </div>
      ` : ""}
      <ul>
        ${list.map(item => `
          <li>
            <button class="shop-item" data-name="${item.name}">
              ${item.image?`<img src="${item.image}" alt="${item.name}" class="shop-item-image">`:""}
              <div>
                <span style="font-weight:bold;">${item.name}</span>
                ${this.activeTab==="items" ? `<span>Possédés : ${item.quantity}</span>` : ""}
                <span>Coût : ${this.activeTab==="items"? this.getTotalCost(item) : item.cost } biscuits</span>
                <span>Effet : ${this.activeTab==="items"
                  ? `+${(item.effect * this.purchaseQuantity).toFixed(1)} biscuits/s`
                  : `${item.effect}`}</span>
              </div>
            </button>
          </li>
        `).join("")}
      </ul>
    `;
  }

  getTotalCost(item) {
    if (this.activeTab === "items") {
      let totalCost = 0;
      for (let i = 0; i < this.purchaseQuantity; i++) {
        totalCost += Math.floor(item.baseCost * Math.pow(1.15, item.quantity + i));
      }
      return totalCost;
    }
    return item.cost;
  }

  updateItemCost(item) {
    if (this.activeTab === "items") {
      item.cost = Math.floor(item.baseCost * Math.pow(1.15, item.quantity));
    }
  }
}