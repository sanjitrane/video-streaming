import express from "express";
import { createReadStream, statSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8000;

app.get("/video", (req, res) => {
  const filePath = `${__dirname}/public/***.mp4`; // Replace *** with the mp4 file in the public folder

  try {
    const stat = statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (!range) {
      res.status(416).send("Requires Range header");
      return;
    }

    const chunkSize = 10 ** 6; // 1MB chunks
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize - 1, fileSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const fileStream = createReadStream(filePath, { start, end });
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error serving video:", error);
    res.status(500).send("Error serving video");
  }
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
