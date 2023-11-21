let cropper; // Variable to hold Cropper.js instance
const fileInput = document.getElementById("fileInput");
const originalImage = document.getElementById("originalImage");
const uploadBtn = document.getElementById("uploadBtn");
function startCropping() {
  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      originalImage.src = event.target.result;
      originalImage.style.width = 700;
      originalImage.style.height = 700;
      cropper = new Cropper(originalImage, {
        cropBoxResizable: true,
        aspectRatio: 1,
      });
    };

    reader.readAsDataURL(file);
  });
}

uploadBtn.addEventListener("click", convertAndUpload);
function convertAndUpload() {
  if (!cropper) {
    alert("Please select an image and start cropping first.");
    return;
  }

  // Get the cropped canvas data
  const croppedCanvas = cropper.getCroppedCanvas();
  const webpData = croppedCanvas.toDataURL("image/webp");

  // Upload the cropped WebP image data to the API
  uploadWebPToAPI(webpData);
}

// Function to upload WebP image to the API (same as previous example)
function uploadWebPToAPI(webpData) {
  // API endpoint URL to which you want to upload the image

  const access_token = localStorage.getItem("access_token");
  const body = {
    image: webpData,
  };

  axios
    .post("/upload", body, {
      headers: {
        authorization: "Bearer " + access_token,
      },
    })
    .then((res) => res.json())
    .then((res) => {
      window.location.href = "/images.html";
    });
}

startCropping();
