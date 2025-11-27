// Local Storage helpers
function getItems() {
    return JSON.parse(localStorage.getItem("closetItems") || "[]");
}

function saveItems(items) {
    localStorage.setItem("closetItems", JSON.stringify(items));
}

// Add item
function addItem(name, owner, category, imageUrl, tags) {
    if(!name || !owner) return alert("Please enter name and owner!");
    const items = getItems();
    items.push({
        id: Date.now(),
        name,
        owner,
        category,
        imageUrl,
        borrowedBy: "",
        favorited: false,
        tags: tags.split(',').map(t => t.trim())
    });
    saveItems(items);
    location.reload();
}

// Delete item
function deleteItem(id) {
    let items = getItems();
    items = items.filter(i => i.id !== id);
    saveItems(items);
    location.reload();
}

// Borrow item
function borrowItem(id) {
    const borrower = prompt("Enter your name to borrow this item:");
    if(!borrower) return;
    const items = getItems();
    const item = items.find(i => i.id === id);
    item.borrowedBy = borrower;
    saveItems(items);
    location.reload();
}

// Return item
function returnItem(id) {
    const items = getItems();
    const item = items.find(i => i.id === id);
    item.borrowedBy = "";
    saveItems(items);
    location.reload();
}

// Favorite item
function toggleFavorite(id) {
    const items = getItems();
    const item = items.find(i => i.id === id);
    item.favorited = !item.favorited;
    saveItems(items);
    location.reload();
}

// Render category cards
function loadCategory(category, filter="") {
    const container = document.getElementById("items");
    container.innerHTML = '<div class="cards-container"></div>';
    const cards = container.querySelector('.cards-container');

    const items = getItems().filter(i => i.category === category &&
        (i.name.toLowerCase().includes(filter.toLowerCase()) ||
         i.owner.toLowerCase().includes(filter.toLowerCase()) ||
         i.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())))
    );

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="info">
                <div><b>${item.name}</b></div>
                <div>Owner: ${item.owner}</div>
                <div>${item.borrowedBy ? "Borrowed by: " + item.borrowedBy : "Available"}</div>
                <div class="tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
            </div>
            <div>
                ${item.borrowedBy 
                    ? `<button onclick="returnItem(${item.id})">Return</button>` 
                    : `<button onclick="borrowItem(${item.id})">Borrow</button>`
                }
                <button onclick="toggleFavorite(${item.id})">★</button>
                <button onclick="deleteItem(${item.id})">Delete</button>
                <button onclick="alert('${item.borrowedBy || 'Not borrowed yet'}')">Who borrowed it?</button>
            </div>
        `;
        cards.appendChild(card);
    });
}

// Render favorites cards
function loadFavorites(filter="") {
    const container = document.getElementById("favorites");
    container.innerHTML = '<div class="cards-container"></div>';
    const cards = container.querySelector('.cards-container');

    const items = getItems().filter(i => i.favorited &&
        (i.name.toLowerCase().includes(filter.toLowerCase()) ||
         i.owner.toLowerCase().includes(filter.toLowerCase()) ||
         i.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())))
    );

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="info">
                <div><b>${item.name}</b></div>
                <div>Owner: ${item.owner}</div>
                <div>${item.borrowedBy ? "Borrowed by: " + item.borrowedBy : "Available"}</div>
                <div class="tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
            </div>
            <div>
                <button onclick="toggleFavorite(${item.id})">Unfavorite</button>
            </div>
        `;
        cards.appendChild(card);
    });
}

// Search handlers
function searchCategory(category) {
    const filter = document.getElementById("searchInput").value;
    loadCategory(category, filter);
}

function searchFavorites() {
    const filter = document.getElementById("searchInput").value;
    loadFavorites(filter);
}
