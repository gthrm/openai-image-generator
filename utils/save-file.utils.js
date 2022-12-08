import https from 'https'; // or 'https' for https:// URLs
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export function saveImage(url, fileName = uuidv4()) {
  const file = fs.createWriteStream(`input/${fileName}.png`);
  https.get(url, (response) => {
    response.pipe(file);

    // after download completed close filestream
    file.on('finish', () => {
      file.close();
      console.log('Download Completed');
    });
  });
}
