document.addEventListener("DOMContentLoaded", function () {
  populateMaterials();

  // Get the initial value of the material dropdown and update the color palette
  const initialMaterial = document.getElementById("material").value;
  populateColorPalette(initialMaterial);
});

// Event listener for the material selection dropdown
document.getElementById("material").addEventListener("change", function () {
  const selectedMaterial = this.value;
  populateColorPalette(selectedMaterial);
});

// Function to populate the material dropdown
function populateMaterials() {
  const materialSelect = document.getElementById("material");

  materialSelect.innerHTML = "";

  for (const material in materialData.materials) {
    const option = document.createElement("option");
    option.value = material.toLowerCase(); // Set the value in lowercase for consistency
    option.textContent = material; // Display the material name
    materialSelect.appendChild(option);
  }
}

// Function to populate color checkboxes based on selected material
function populateColorPalette(material) {
  const colorPaletteContainer = document.getElementById(
    "colorPaletteContainer"
  );

  // Clear any existing checkboxes
  colorPaletteContainer.innerHTML = "";

  // Get the color palette for the selected material from the object
  const selectedMaterial = materialData.materials[material];
  if (selectedMaterial && selectedMaterial.colorPalette) {
    selectedMaterial.colorPalette.forEach((color, index) => {
      // Create a checkbox for each color
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `color${index + 1}`;
      checkbox.name = `color${index + 1}`;
      checkbox.value = color;
      checkbox.checked = true; // By default, all colors are selected

      // Create a label for the checkbox
      const label = document.createElement("label");
      label.htmlFor = `color${index + 1}`;
      label.textContent = color;

      // Append the checkbox and label to the container
      colorPaletteContainer.appendChild(checkbox);
      colorPaletteContainer.appendChild(label);
      colorPaletteContainer.appendChild(document.createElement("br"));
    });
  }
}

///////////////////////////////////////////////////////////////////////////////////////////

var TILE_WIDTH = 20;
var TILE_HEIGHT = 20;

document.getElementById("imageUpload").onchange = function () {
  var reader = new FileReader();
  reader.onload = function (e) {
    var imageElement = document.getElementById("image");
    imageElement.onload = function () {
      scaleAndDisplayImage(imageElement);
    };
    imageElement.src = e.target.result; // Set the source to the loaded image
  };
  // read the image file as a data URL.
  reader.readAsDataURL(this.files[0]);
};

document.getElementById("confirmConfigBtn").onclick = function () {};
// Function to scale and display the uploaded image to fit within the browser window while maintaining aspect ratio
function scaleAndDisplayImage(image) {
  // Get the dimensions of the browser window
  var maxWidth = window.innerWidth;
  var maxHeight = window.innerHeight;

  // Calculate aspect ratio of the image
  var aspectRatio = image.width / image.height;

  // Initialize the canvas dimensions based on the aspect ratio
  var canvasWidth = maxWidth;
  var canvasHeight = maxWidth / aspectRatio;

  // If the calculated height is greater than the browser height, adjust based on height
  if (canvasHeight > maxHeight) {
    canvasHeight = maxHeight;
    canvasWidth = maxHeight * aspectRatio;
  }

  // Create the canvas for the uploaded image display
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Draw the image at the scaled size while maintaining the aspect ratio
  context.drawImage(image, 0, 0, canvasWidth, canvasHeight);

  // Clear the previous image display and append the new scaled canvas
  var previewContainer = document.getElementById("mosaicPreview");
  previewContainer.innerHTML = ""; // Clear previous content
  previewContainer.appendChild(canvas);
}

// Function call to create photomosaic
function photomosaic(image) {
  // Get the dimensions of the browser window
  var maxWidth = window.innerWidth;
  var maxHeight = window.innerHeight;

  // Calculate aspect ratio and scaled dimensions
  var aspectRatio = image.width / image.height;
  var canvasWidth = maxWidth;
  var canvasHeight = maxWidth / aspectRatio;

  // If the height is too large, scale based on height instead
  if (canvasHeight > maxHeight) {
    canvasHeight = maxHeight;
    canvasWidth = maxHeight * aspectRatio;
  }

  // Creating the canvas for photomosaic
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Scale the image to fit within the canvas while maintaining the aspect ratio
  context.drawImage(image, 0, 0, canvasWidth, canvasHeight);

  var imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
  var pixels = imageData.data;

  // Number of mosaic tiles
  var numTileRows = Math.floor(canvasHeight / TILE_HEIGHT);
  var numTileCols = Math.floor(canvasWidth / TILE_WIDTH);

  // Canvas copy of image
  var imageCanvas = document.createElement("canvas");
  var imageCanvasContext = imageCanvas.getContext("2d");
  imageCanvas.width = canvasWidth;
  imageCanvas.height = canvasHeight;
  imageCanvasContext.drawImage(image, 0, 0, canvasWidth, canvasHeight);

  // Function for finding the average color
  function averageColor(row, column) {
    var blockSize = 1, // we can set how many pixels to skip
      data,
      width,
      height,
      i = -4,
      length,
      rgb = {
        r: 0,
        g: 0,
        b: 0,
      },
      count = 0;

    try {
      data = imageCanvasContext.getImageData(
        column * TILE_WIDTH,
        row * TILE_HEIGHT,
        TILE_WIDTH,
        TILE_HEIGHT
      );
    } catch (e) {
      alert("Not happening this time!");
      return rgb;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
  }

  // Loop through each tile
  for (var r = 0; r < numTileRows; r++) {
    for (var c = 0; c < numTileCols; c++) {
      // Set the pixel values for each tile
      var rgb = averageColor(r, c);
      var red = rgb.r;
      var green = rgb.g;
      var blue = rgb.b;

      // Loop through each tile pixel
      for (var tr = 0; tr < TILE_HEIGHT; tr++) {
        for (var tc = 0; tc < TILE_WIDTH; tc++) {
          // Calculate the true position of the tile pixel
          var trueRow = r * TILE_HEIGHT + tr;
          var trueCol = c * TILE_WIDTH + tc;

          // Calculate the position of the current pixel in the array
          var pos = trueRow * (imageData.width * 4) + trueCol * 4;

          // Assign the colour to each pixel
          pixels[pos + 0] = red;
          pixels[pos + 1] = green;
          pixels[pos + 2] = blue;
          pixels[pos + 3] = 255;
        }
      }
    }
  }

  // Draw image data to the canvas
  context.putImageData(imageData, 0, 0);
  return canvas;
}

function create() {
  var image = document.getElementById("image");
  var canvas = photomosaic(image);
  document.getElementById("output").innerHTML = ""; // Clear previous canvas
  document.getElementById("output").appendChild(canvas);
}

materialData = {
  materials: {
    Glas: {
      tileSizes: [10, 20, 30],
      colorPalette: [
        "#FF5733",
        "#33FF57",
        "#3357FF",
        "#FFFF33",
        "#FF33FF",
        "#33FFFF",
        "#C70039",
        "#900C3F",
        "#581845",
        "#FFC300",
        "#DAF7A6",
        "#FF5733",
        "#1F618D",
        "#1ABC9C",
        "#F39C12",
        "#D35400",
        "#8E44AD",
        "#2ECC71",
        "#E74C3C",
        "#9B59B6",
        "#2980B9",
        "#27AE60",
        "#16A085",
        "#2C3E50",
        "#34495E",
        "#ECF0F1",
        "#E67E22",
        "#7D3C98",
        "#8E44AD",
        "#5DADE2",
        "#48C9B0",
        "#C0392B",
        "#A569BD",
        "#5499C7",
        "#1F618D",
        "#7FB3D5",
        "#85929E",
        "#F7DC6F",
        "#E74C3C",
        "#1ABC9C",
        "#58D68D",
        "#5DADE2",
        "#F39C12",
        "#D5D8DC",
        "#F8C471",
        "#CD6155",
        "#7B7D7D",
        "#5F6A6A",
      ],
    },
    Keramik: {
      tileSizes: [15, 25, 35],
      colorPalette: [
        "#FF4500",
        "#32CD32",
        "#1E90FF",
        "#FFD700",
        "#FF1493",
        "#00CED1",
        "#FA8072",
        "#7CFC00",
        "#FF69B4",
        "#BA55D3",
        "#9370DB",
        "#3CB371",
        "#20B2AA",
        "#778899",
        "#B0C4DE",
        "#00FF00",
        "#4682B4",
        "#4169E1",
        "#6A5ACD",
        "#483D8B",
        "#BDB76B",
        "#2E8B57",
        "#8FBC8F",
        "#DA70D6",
        "#7FFFD4",
        "#00FA9A",
        "#FFDAB9",
        "#B22222",
        "#BC8F8F",
        "#8B4513",
        "#A52A2A",
        "#A0522D",
        "#8A2BE2",
        "#FF6347",
        "#EE82EE",
        "#D2691E",
        "#8B0000",
        "#006400",
        "#4682B4",
        "#8A2BE2",
      ],
    },
    Marmor: {
      tileSizes: [20, 40, 60],
      colorPalette: [
        "#D3D3D3",
        "#A9A9A9",
        "#808080",
        "#696969",
        "#778899",
        "#2F4F4F",
        "#C0C0C0",
        "#DCDCDC",
        "#BEBEBE",
        "#A0A0A0",
        "#8B8B8B",
        "#4F4F4F",
        "#7B7B7B",
        "#525252",
      ],
    },
  },
  gaps: [1, 2, 3, 4, 5],
};
