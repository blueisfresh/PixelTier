let mosaicConfig = {
  width: 0,
  height: 0,
  material: "",
  gapSize: 0,
  tileSize: 0,
};

// mosaic Plan
let mosaicPlan = [];

// Uploaded Picture Variables
let imgFile = undefined;
const uploadedFileForm = document.getElementById("imageUpload");
const imgPreviewContainer = document.getElementById("mosaicPreview");

// Configuation Variables
const inputWidth = document.getElementById("width");
const inputHeight = document.getElementById("height");
const selectMaterial = document.getElementById("material");
const selectGap = document.getElementById("gap");
const selectTileSize = document.getElementById("tileSize");

const btnImgUpload = document.getElementById("imageUploadBtn");
const btnConfirmSelection = document.getElementById("confirmConfigBtn");
// Handle file selection
uploadedFileForm.addEventListener("change", function (evt) {
  evt.preventDefault();

  imgFile = uploadedFileForm.files[0]; // File REFFERENCE in a variable
  console.log("File selected", imgFile);

  if (imgFile) {
    displayImage(imgFile); 
  } else {
    clearImage(); 
  }
});

// Event-Listener für den Bestätigungsbutton
btnConfirmSelection.addEventListener("click", function () {
  mosaicConfig.width = inputWidth.value;
  mosaicConfig.height = inputHeight.value;
  mosaicConfig.material = selectMaterial.value;
  mosaicConfig.gap = selectGap.value;
  mosaicConfig.tileSize = selectTileSize.value;

  // Die gesammelten Konfigurationen anzeigen (oder weiter verarbeiten)
  console.log("Mosaik-Konfiguration:", mosaicConfig);
});

function displayImage(file) {
  const reader = new FileReader();

  reader.onload = function (event) {
    clearImage(); 

    const imgElement = document.createElement("img");
    imgElement.src = event.target.result; // Set the loaded image as the source
    imgElement.alt = "Uploaded Image";
    imgElement.style.maxWidth = "100%"; // Optional: Set image size styles
    imgPreviewContainer.appendChild(imgElement); // Display the image
  };

  reader.readAsDataURL(file); // Reads the file content and triggers 'onload'
}

function clearImage() {
  imgPreviewContainer.innerHTML = ""; 
}


// Calculating the mosaik 

function getColorPalette(material) {
  // Check if the JSON data is loaded
  if (!jsonData || !jsonData.materials) {
    console.error('JSON data is not loaded or materials key is missing.');
    return [];
  }

  // Retrieve the material data from the JSON
  const materialData = jsonData.materials[material];
  
  // Check if the material exists in the JSON and has a color palette
  if (materialData && materialData.colorPalette) {
    return materialData.colorPalette;
  } else {
    console.error(`Color palette not found for the selected material: ${material}`);
    return [];
  }
}

function calculateTiles(mosaicWidth, mosaicHeight, tileSize, gapSize) {

  const numTilesWidth = Math.floor(mosaicWidth / (tileSize + gapSize));
  const numTilesHeight = Math.floor(mosaicHeight / (tileSize + gapSize));

  return {
    numTilesWidth,
    numTilesHeight
  };
}

function generateMosaicPlan(palette) {
  // Generate the 2D mosaic plan using the color palette and tile configuration.

  // This function calculates the number of tiles (from calculateTiles()) that fit within the mosaic dimensions.
  
  // It loops through each tile position, retrieves the average color from the corresponding area in the uploaded image, 
  // It finds the closest matching color from the provided color palette (from getColorPalette()).
  
  // For each tile, the closest color is assigned to the mosaic grid. 
  // The generated mosaic plan is a 2D array that contains the colors assigned to each tile, which will be passed to the renderMosaic() function to draw the mosaic on the canvas.
}

function renderMosaic(mosaicPlan) {
  // Display the mosaic on an HTML <canvas> element.

  // This function takes the output of generateMosaicPlan() and draws the final mosaic on the screen.
}

