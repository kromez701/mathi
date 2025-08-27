// Base URLs for each group
const GROUP_URL_BASE = {
  1: "https://store.com/buy-1/",
  2: "https://store.com/buy-2/",
  3: "https://store.com/buy-3/",
};

// Function to get the selected color for a specific item in a group
function getSelectedColor(groupId, itemId) {
  const colorSelect = document.getElementById(
    `pennywise-volume-group-detail-${groupId}-item-${itemId}-option-Farge`
  );
  return colorSelect ? colorSelect.value.trim() : null;
}

// Get all colors for the selected group
function getColorCombination(groupId) {
  const colors = [];
  // Number of items in the group = groupId (1, 2, or 3)
  for (let i = 1; i <= groupId; i++) {
    const color = getSelectedColor(groupId, i);
    if (color) colors.push(color.toLowerCase().replace(/\s+/g, "-")); // e.g. "Mørk Brun" -> "mørk-brun"
  }
  return colors.join("-");
}

// Get the selected group (Buy 1, 2, or 3)
function getSelectedGroup() {
  for (let i = 1; i <= 3; i++) {
    const radio = document.getElementById(`pennywise-volume-select-${i}`);
    if (radio && radio.checked) {
      return i;
    }
  }
  // fallback: look for selected class
  for (let i = 1; i <= 3; i++) {
    const group = document.getElementById(`pennywise-volume-group-${i}`);
    if (group && group.classList.contains("pennywise-volume-group-selected")) {
      return i;
    }
  }
  return 2; // default = group 2
}

// Build redirect URL
function buildRedirectUrl() {
  const group = getSelectedGroup();
  const colors = getColorCombination(group);
  const base = GROUP_URL_BASE[group] || "https://store.com/checkout";

  return colors ? `${base}${colors}` : base;
}

// Handle add-to-cart click
function handleAddToCart(event) {
  event.preventDefault();
  const redirectUrl = buildRedirectUrl();
  console.log("Redirecting to:", redirectUrl);
  window.location.href = redirectUrl;
}

// Initialize
function initializeVolumeRedirect() {
  const addToCartButton = document.getElementById("pennywise-volume-button");
  if (addToCartButton) {
    addToCartButton.removeEventListener("click", handleAddToCart);
    addToCartButton.addEventListener("click", handleAddToCart);
  }

  const form = document.querySelector("#pennywise-volume-widget form");
  if (form) {
    form.removeEventListener("submit", handleAddToCart);
    form.addEventListener("submit", handleAddToCart);
  }
}

// DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeVolumeRedirect);
} else {
  initializeVolumeRedirect();
}
