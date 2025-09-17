document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("items-grid");
  const sortSelect = document.getElementById("sort-order");
  const categorySelect = document.getElementById("category-filter");
  const searchInput = document.getElementById("search-bar");

  if (!products || products.length === 0) {
    grid.innerHTML = "<p>No products available.</p>";
    return;
  }

  function renderItems() {
    grid.innerHTML = "";

    const order = sortSelect.value;
    const category = categorySelect.value;
    const searchTerm = searchInput.value.toLowerCase();

    let filtered = [...products];

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter(item => item.category === category);
    }

    // Search filter (name + category)
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by release date
    filtered.sort((a, b) => {
      const dateA = new Date(a.releaseDate);
      const dateB = new Date(b.releaseDate);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });

    if (filtered.length === 0) {
      grid.innerHTML = "<p>No items match your search.</p>";
      return;
    }

    // Build product cards
    filtered.forEach(item => {
      const card = document.createElement("a");
      card.href = item.url;
      card.className = "product-card";
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>Released: ${item.releaseDate}</p>
        <p>Category: ${item.category}</p>
      `;
      grid.appendChild(card);
    });
  }

  // Initial render
  renderItems();

  // Event listeners
  sortSelect.addEventListener("change", renderItems);
  categorySelect.addEventListener("change", renderItems);
  searchInput.addEventListener("input", renderItems);
});
