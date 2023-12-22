//A Responsive Machine learning Colored image converted into black and white image 
//Here we created an image container which accepts input from user and convert the colored image into black and white iamge and shown preview to user before downlaod  
//Remeber we used gray scale function in javascript, RGB (255,255,255) to (0,0,0) format and user can able to download the processed output image into their local device in .png format
//Make more enhanced by adding more advanced features like adding brightness or contrast into processed iamge based on individual needs.
    document.getElementById('inputImage').addEventListener('change', handleImage);
    document.getElementById('downloadBtn').addEventListener('click', downloadImage);

    function handleImage() {
      const input = document.getElementById('inputImage');
      const canvas = document.getElementById('outputCanvas');
      const ctx = canvas.getContext('2d');
      const outputImage = document.getElementById('outputImage');
      const downloadBtn = document.getElementById('downloadBtn');

      downloadBtn.disabled = true;

      const img = new Image();
      img.src = URL.createObjectURL(input.files[0]);

      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        convertToBlackAndWhite(imageData.data);

        ctx.putImageData(imageData, 0, 0);
        outputImage.src = canvas.toDataURL();
        downloadBtn.disabled = false;
      };
    }

    function convertToBlackAndWhite(imageData) {
      for (let i = 0; i < imageData.length; i += 4) {
        const average = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
        imageData[i] = average;         // Red
        imageData[i + 1] = average;     // Green
        imageData[i + 2] = average;     // Blue
      }
    }

    function downloadImage() {
      const canvas = document.getElementById('outputCanvas');
      const downloadBtn = document.getElementById('downloadBtn');

      const link = document.createElement('a');
      link.download = 'black_and_white_image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      downloadBtn.disabled = true;
    }
  