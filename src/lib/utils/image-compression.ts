const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Input and output directories
const inputDirectory = path.join(__dirname, '../../../public/images/artwork');
const outputDirectory = path.join(__dirname, '../../../public/images/optimized');

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// Optimize images in the input directory
(async () => {
  try {
    // Get a list of image files in the input directory
    const files = fs.readdirSync(inputDirectory);

    for (const file of files) {
      const inputFilePath = path.join(inputDirectory, file);
      const outputFilePath = path.join(outputDirectory, file);

      // Optimize the image using sharp
      await sharp(inputFilePath)
        .jpeg({
          quality: 70, // Adjust the quality (0-100)
        })
        .toFile(outputFilePath);

      console.log(`Optimized: ${inputFilePath}`);
    }

    console.log('Image optimization completed.');
  } catch (error) {
    console.error('Image optimization error:', error);
  }
})();
