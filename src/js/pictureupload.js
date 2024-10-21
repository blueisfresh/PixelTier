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
