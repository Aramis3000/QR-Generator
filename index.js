import qr from 'qr-image';
import fs from 'fs';
import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);
console.log(__dirname);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post('/submit', (req, res) => {
  const url = req.body.URL;

  const qrSvg = qr.image(url, { type: 'png' });
  
  const writeStream = fs.createWriteStream('public/images/qr-code.png');

  qrSvg.pipe(writeStream);

  res.render('result.ejs', { url: url, qrCodePath: 'images/qr-code.png' });
      
});
    
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

