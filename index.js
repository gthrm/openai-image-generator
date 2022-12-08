import { Configuration, OpenAIApi } from 'openai';
import { config } from 'dotenv';
import { saveImage } from './utils/save-file.utils.js';

config();
const myArgs = process.argv.slice(2);
const aiPrompt = myArgs[0];
const nImages = myArgs[1] || 10;
const apiKey = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);
if (aiPrompt) {
  const response = await openai.createImage({
    prompt: aiPrompt,
    n: nImages,
    size: '1024x1024',
  });

  for (const { url } of response.data.data) {
    console.log('url', url);
    saveImage(url);
  }
}
