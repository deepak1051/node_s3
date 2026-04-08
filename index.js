import express from 'express';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors'


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json())

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: 'ap-south-1',
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/upload', (req, res) => {
  //my_user_id/my_image.jpeg

  const key = `my_user_id/${uuidv4()}.jpeg`;

  s3.getSignedUrl(
    'putObject',
    {
      Bucket: 'sg-blog-bucket-7-4-26',
      ContentType: 'image/jpeg',
      Key: key,
    },
    (err, url) => {
      res.send({ key, url });
    },
  );
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// [
//     {
//         "AllowedHeaders": [
//             "*"
//         ],
//         "AllowedMethods": [
//             "PUT"
//         ],
//         "AllowedOrigins": [
//             "http://localhost:3000"
//         ],
//         "ExposeHeaders": [],
//         "MaxAgeSeconds": 3000
//     }
// ]