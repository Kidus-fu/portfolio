export default function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    rotation = 0
  ): Promise<string> {
    const createImage = (url: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // for cross-origin images
        image.src = url;
      });
  
    return new Promise(async (resolve, reject) => {
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      // Calculate safe area for rotation
      const maxSize = Math.max(image.width, image.height);
      const safeArea = maxSize * 2;
  
      canvas.width = safeArea;
      canvas.height = safeArea;
  
      if (ctx) {
        // move canvas center to safeArea/2, rotate, then move back
        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-safeArea / 2, -safeArea / 2);
        ctx.drawImage(
          image,
          (safeArea - image.width) / 2,
          (safeArea - image.height) / 2
        );
        const data = ctx.getImageData(0, 0, safeArea, safeArea);
  
        // Set canvas to desired crop size
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
  
        // Paste the rotated image data, shifted to match crop area
        ctx.putImageData(
          data,
          Math.round(0 - safeArea / 2 + image.width / 2 - pixelCrop.x),
          Math.round(0 - safeArea / 2 + image.height / 2 - pixelCrop.y)
        );
  
        // Return the cropped image as a Base64 string
        resolve(canvas.toDataURL('image/jpeg'));
      } else {
        reject(new Error('Could not get canvas context'));
      }
    });
  }
  