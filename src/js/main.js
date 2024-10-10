let mosaicConfig = {
  width: 0,
  height: 0,
  material: "",
  gapSize: 0,
  tileSize: 0,
};

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
    displayImage(imgFile); // Display the image if a file is selected
  } else {
    clearImage(); // Clear the image if no file is selected
  }
});

// Event-Listener für den Bestätigungsbutton
btnConfirmSelection.addEventListener("click", function () {
  // Alle Werte aus den Eingabefeldern in Object
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
    clearImage(); // Clear any previously displayed image

    const imgElement = document.createElement("img");
    imgElement.src = event.target.result; // Set the loaded image as the source
    imgElement.alt = "Uploaded Image";
    imgElement.style.maxWidth = "100%"; // Optional: Set image size styles
    imgPreviewContainer.appendChild(imgElement); // Display the image
  };

  reader.readAsDataURL(file); // Reads the file content and triggers 'onload'
}

function clearImage() {
  imgPreviewContainer.innerHTML = ""; // Clears the mosaicPreview div
}
