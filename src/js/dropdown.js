// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  populateGapSize();
  handleMaterialChange();
});

// Add an event listener for when the user selects a material
materialDropdown.addEventListener("change", handleMaterialChange);

function populateGapSize() {
  console.log("Populating gap size dropdown...");
  if (!gapSize) return;

  materialDropdown.innerHTML = "";

  gapSize.forEach((size) => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size + " mm";
    selectGap.appendChild(option);
  });

  populateMaterialDropdown();
}

function populateMaterialDropdown() {
  console.log("Populating material dropdown...");
  // Check if jsonData and stones exist
  if (!jsonData || !jsonData.stones) {
    console.error("jsonData or stones not available");
    return;
  }

  console.log("Populating material dropdown...");

  const materials = new Set();
  jsonData.stones.forEach((stone) => {
    materials.add(stone.material);
  });

  // Check if any materials were found
  if (materials.size === 0) {
    console.error("No materials found");
    return;
  }

  materialDropdown.innerHTML = ""; // Clear existing options

  materials.forEach((material) => {
    const option = document.createElement("option");
    option.value = material;
    option.textContent = material.charAt(0).toUpperCase() + material.slice(1);
    materialDropdown.appendChild(option);
  });
}

function handleMaterialChange() {
  populateSizeDropdown(materialDropdown.value);
}

function populateSizeDropdown(selectedMaterial) {
  selectTileSize.innerHTML = "";

  // Filter stones by the selected material and add unique sizes to the dropdown
  const sizes = new Set();
  jsonData.stones.forEach((stone) => {
    if (stone.material === selectedMaterial) {
      sizes.add(stone.size);
    }
  });

  sizes.forEach((size) => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = `${size} mm`;
    selectTileSize.appendChild(option);
  });
}
