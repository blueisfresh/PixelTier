var TILE_WIDTH = 50;
var TILE_HEIGHT = 50;

document.getElementById("input").onchange = function () {
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
