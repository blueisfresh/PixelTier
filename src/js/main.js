let mosaicConfig = {
  width: 0,
  height: 0,
  material: "",
  gapSize: 0,
  tileSize: 0,
};

// mosaic Plan
let mosaicPlan = [];

// global variables for the canvas and its context
let canvas;
let ctx;

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
const btnGenerateMosaic = document.getElementById("mosaicGenerateBtn");

// Initialisation
document.addEventListener("DOMContentLoaded", function () {
  console.log(jsonData); // This should print the jsonData object from materialData.js
});

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
  mosaicConfig.width = parseFloat(inputWidth.value);
  mosaicConfig.height = parseFloat(inputHeight.value);
  mosaicConfig.material = selectMaterial.value;
  mosaicConfig.gap = parseFloat(selectGap.value);

  // Extract only the number part from '10x10'
  mosaicConfig.tileSize = parseFloat(selectTileSize.value.split("x")[0]);

  console.log("Mosaik-Konfiguration:", mosaicConfig);
});

// Event listener for the "Generate Mosaic" button
btnGenerateMosaic.addEventListener("click", function () {
  if (canvas && ctx) {
    // Call the generateMosaicPlan function with the global canvas and context
    if (ctx) {
      const mosaicPlan = generateMosaicPlan(ctx, canvas.width, canvas.height);
    } else {
      console.log("Ctx is not set/ The picture has not been uploaded yet");
    }

    // Render the mosaic
    renderMosaic(mosaicPlan);
  } else {
    console.error("Canvas or context not initialized.");
  }
});

function displayImage(file) {
  const reader = new FileReader();

  reader.onload = function (event) {
    clearImage();

    const imgElement = new Image();
    imgElement.src = event.target.result; // Set the loaded image as the source

    imgElement.onload = function () {
      canvas = document.createElement("canvas");
      ctx = canvas.getContext("2d");

      // Set canvas size based on the uploaded image
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;

      // Draw the image on the canvas
      ctx.drawImage(imgElement, 0, 0);

      // Append the canvas to the preview container
      imgPreviewContainer.appendChild(canvas);
    };
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
    throw new Error(
      "JSON data is not loaded or the 'materials' key is missing."
    );
  }

  // Retrieve the material data from the JSON
  const materialData = jsonData.materials[material];

  // Check if the material exists in the JSON and has a color palette
  if (materialData && materialData.colorPalette) {
    return materialData.colorPalette;
  } else {
    console.error(
      `Color palette not found for the selected material: ${material}`
    );
    return [];
  }
}

function calculateTiles(mosaicWidth, mosaicHeight, tileSize, gapSize) {
  const numTilesWidth = Math.floor(mosaicWidth / (tileSize + gapSize));
  const numTilesHeight = Math.floor(mosaicHeight / (tileSize + gapSize));

  return {
    numTilesWidth,
    numTilesHeight,
  };
}

function generateMosaicPlan(ctx, width, height) {
  const { numTilesWidth, numTilesHeight } = calculateTiles(
    width,
    height,
    mosaicConfig.tileSize,
    mosaicConfig.gap
  );

  mosaicPlan = []; // Reset the mosaic plan array for new generation

  // Loop through each tile in the mosaic grid
  for (let y = 0; y < numTilesHeight; y++) {
    let row = []; // Create a new array for each row

    for (let x = 0; x < numTilesWidth; x++) {
      // Calculate the average hex color for the current tile area
      const avgColor = getAverageColorFromImage(
        ctx,
        x * (mosaicConfig.tileSize + mosaicConfig.gap),
        y * (mosaicConfig.tileSize + mosaicConfig.gap),
        mosaicConfig.tileSize
      );

      // Find the closest hex code from the selected material's color palette
      const closestColor = getClosestColor(avgColor, mosaicConfig.material);

      // Push the closest hex color value to the current row
      row.push(closestColor);
    }

    // After the row is filled with colors for the current y-level, push it to the mosaic plan
    mosaicPlan.push(row);
  }

  console.log("Final Mosaic Plan:", mosaicPlan); // Debugging: see how the mosaic plan is constructed
  return mosaicPlan; // The 2D array of average colors for each tile
}

// Finds the closest matching color in the palette based on the average color of the tile.
function getClosestColor(avgColor, material) {
  const colorPalette = getColorPalette(material);
  let closestColor = colorPalette[0];
  let smallestDistance = Infinity; // Start with an infinitely large distance

  const avgRGB = hexToRgb(avgColor); // Convert the average color (hex) to RGB for comparison

  // Iterate through each color in the palette to find the closest match
  colorPalette.forEach((paletteColor) => {
    const paletteRGB = hexToRgb(paletteColor);
    const distance = colorDistance(avgRGB, paletteRGB);

    // Update the closest color if a smaller distance is found
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestColor = paletteColor;
    }
  });

  console.log(`Closest color to ${avgColor} is ${closestColor}`);
  return closestColor;
}

// Calculates the Euclidean distance between two RGB colors.
function colorDistance(rgb1, rgb2) {
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
  );
}

// Converts a hex color code to an RGB object.
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);

  return {
    r: (bigint >> 16) & 255, // Extract the red value
    g: (bigint >> 8) & 255, // Extract the green value
    b: bigint & 255, // Extract the blue value
  };
}

function renderMosaic(mosaicPlan) {
  // Display the mosaic on an HTML <canvas> element.
  // This function takes the output of generateMosaicPlan() and draws the final mosaic on the screen.
}

function getAverageColorFromImage(ctx, startX, startY, tileSize) {
  // Extract the pixel data for the area that corresponds to this tile
  const imageData = ctx.getImageData(startX, startY, tileSize, tileSize);
  const pixels = imageData.data; // This is an array containing RGBA values of each pixel

  let totalR = 0,
    totalG = 0,
    totalB = 0;
  const pixelCount = pixels.length / 4; // Each pixel has 4 values: R, G, B, and A

  // Loop through the pixel data and sum the R, G, and B values
  for (let i = 0; i < pixels.length; i += 4) {
    totalR += pixels[i]; // Red
    totalG += pixels[i + 1]; // Green
    totalB += pixels[i + 2]; // Blue
  }

  // Calculate the average color by dividing the total R, G, B values by the number of pixels
  const avgR = Math.floor(totalR / pixelCount);
  const avgG = Math.floor(totalG / pixelCount);
  const avgB = Math.floor(totalB / pixelCount);

  // Convert the average RGB color to a hex color code
  return rgbToHex(avgR, avgG, avgB);
}

function rgbToHex(r, g, b) {
  // Convert RGB values to hex format
  const toHex = (component) => component.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/*
- `generateMosaicPlan`: This function splits the original image into sections (tiles) based on the number of tiles and the gap size.
   It calculates the average hex color for each tile and returns a 2D array of the hex values.

- `buildNewMosaicWithPalette`: This function takes the 2D array of hex colors from `generateMosaicPlan`
   and maps each color to the closest color from the selected material's palette. 
   The result is a new 2D array of palette colors, with the gaps preserved.

- `renderMosaic`: This function takes the final 2D array of palette colors and draws the mosaic on the canvas, 
   keeping the gaps between the tiles. The result is the visual mosaic generated from the original image using the material's palette.

- `getClosestColor`: This function compares the average color of each tile to the colors in the palette and returns the closest matching color 
   based on the smallest color distance.
*/
