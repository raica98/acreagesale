import express from 'express';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PROPERTY_API_TOKEN = process.env.PROPERTY_API_TOKEN;
const PROPERTY_API_BASE_URL = process.env.PROPERTY_API_BASE_URL;

const TEMP_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

function validateEnvironment() {
  const required = ['OPENAI_API_KEY', 'GOOGLE_MAPS_API_KEY', 'PROPERTY_API_TOKEN', 'PROPERTY_API_BASE_URL'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.warn(`⚠️  Warning: Missing environment variables: ${missing.join(', ')}`);
  }
}

async function downloadGoogleMapsImage(lat, lng, propertyId) {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=17&size=1024x1024&maptype=satellite&key=${GOOGLE_MAPS_API_KEY}`;
  const tempFilePath = path.join(TEMP_DIR, `${propertyId}_original.jpg`);

  console.log(`📥 Downloading satellite image for property ${propertyId} at (${lat}, ${lng})`);

  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(tempFilePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`✅ Satellite image saved to ${tempFilePath}`);
        resolve(tempFilePath);
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`❌ Failed to download Google Maps image: ${error.message}`);
    throw new Error(`Google Maps API error: ${error.message}`);
  }
}

async function enhanceImageWithOpenAI(imagePath) {
  console.log(`🎨 Sending image to OpenAI for enhancement`);

  try {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    formData.append('prompt', 'Make this satellite image look like a realistic drone photo of the property landscape, keeping all existing details intact, without adding new elements.');
    formData.append('model', 'dall-e-2');
    formData.append('n', '1');
    formData.append('size', '1024x1024');

    const response = await axios.post('https://api.openai.com/v1/images/edits', formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    });

    const enhancedImageUrl = response.data.data[0].url;
    console.log(`✅ Enhanced image URL received from OpenAI`);
    return enhancedImageUrl;
  } catch (error) {
    console.error(`❌ OpenAI API error: ${error.response?.data || error.message}`);
    throw new Error(`OpenAI API error: ${error.response?.data?.error?.message || error.message}`);
  }
}

async function updatePropertyWithImage(propertyId, enhancedImageUrl) {
  const url = `${PROPERTY_API_BASE_URL}/properties/${propertyId}`;
  console.log(`📤 Updating property ${propertyId} with enhanced image`);

  try {
    await axios.patch(url, {
      drone_image_url: enhancedImageUrl
    }, {
      headers: {
        'Authorization': `Bearer ${PROPERTY_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ Property ${propertyId} updated successfully`);
  } catch (error) {
    console.error(`❌ Failed to update property: ${error.message}`);
    throw new Error(`Property API error: ${error.message}`);
  }
}

function cleanupTempFiles(propertyId) {
  const tempFilePath = path.join(TEMP_DIR, `${propertyId}_original.jpg`);
  if (fs.existsSync(tempFilePath)) {
    fs.unlinkSync(tempFilePath);
    console.log(`🧹 Cleaned up temporary file for property ${propertyId}`);
  }
}

app.post('/process-property', async (req, res) => {
  const { id, lat, lng, address } = req.body;

  console.log(`\n🚀 Starting processing for property ${id}`);
  console.log(`📍 Location: ${address || 'N/A'} (${lat}, ${lng})`);

  if (!id) {
    console.error(`❌ Missing property ID`);
    return res.status(400).json({
      status: 'error',
      message: 'Property ID is required'
    });
  }

  if (!lat || !lng) {
    console.error(`❌ Missing coordinates for property ${id}`);
    return res.status(400).json({
      status: 'error',
      property_id: id,
      message: 'Latitude and longitude are required'
    });
  }

  try {
    const imagePath = await downloadGoogleMapsImage(lat, lng, id);

    const enhancedImageUrl = await enhanceImageWithOpenAI(imagePath);

    await updatePropertyWithImage(id, enhancedImageUrl);

    cleanupTempFiles(id);

    console.log(`✅ Processing completed for property ${id}\n`);

    return res.status(200).json({
      status: 'ok',
      property_id: id,
      enhanced_image_url: enhancedImageUrl
    });

  } catch (error) {
    console.error(`❌ Processing failed for property ${id}: ${error.message}\n`);

    cleanupTempFiles(id);

    return res.status(500).json({
      status: 'error',
      property_id: id,
      message: error.message
    });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'AI Property Visualizer',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`\n🎯 AI Property Visualizer Server`);
  console.log(`🌐 Running on port ${PORT}`);
  console.log(`📡 Webhook endpoint: POST http://localhost:${PORT}/process-property`);
  console.log(`💚 Health check: GET http://localhost:${PORT}/health\n`);

  validateEnvironment();
});
