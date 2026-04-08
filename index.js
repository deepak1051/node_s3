import express from 'express';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: 'ap-south-1',
});

app.get('/api/upload', (req, res) => {
  //my_user_id/my_image.jpeg

  const key = `my_user_id/${uuidv4()}.jpeg`;

  s3.getSignedUrl('putObject', {
    Bucket: 'sg-blog-bucket-7-4-26',
    ContentType: 'jpeg',
    Key: key,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
