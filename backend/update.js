const Photo = require("./models/Photo");
const exifreader = require("exifreader");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const mime = require("mime-kind");
const moment = require("moment");

async function main() {
  try {
    const allPhotos = await Photo.find().select("path");
    console.log(allPhotos);
    await fs.promises.mkdir(path.join("../thumbs/"), { recursive: true });
    const folder = await fs.promises.readdir(process.env.DIR_PHOTOS);
    for (let i = 0; i < folder.length; i++) {
      const thisFile = folder[i];
      const filePath = path.resolve(process.env.DIR_PHOTOS, thisFile);
      if (allPhotos.filter(e => e.path === filePath).length === 0) {
        console.log(filePath);
        const file = await fs.promises.readFile(filePath);
        const mimeType = await mime(filePath);
        if (mimeType && mimeType.mime === "image/jpeg") {
          try {
            const exif = exifreader.load(file);
            const sharpBuffer = await sharp(file)
              .resize({ width: 800 })
              .grayscale()
              .toFormat("webp")
              .toBuffer();
            const photoRecord = await Photo.findOneAndUpdate(
              { path: filePath },
              {
                exif,
                datePhotographed: moment(
                  exif["DateTime"].value[0],
                  "YYYY:MM:DD HH:mm:ss"
                ).toDate(),
                datePhotographedGrouping: moment(
                  exif["DateTime"].value[0],
                  "YYYY:MM:DD HH:mm:ss"
                ).format("YYYY/DDD"),
              },
              { upsert: true, new: true }
            );
            await fs.promises.writeFile(
              `${path.join("../thumbs/", photoRecord._id.toString())}.webp`,
              sharpBuffer
            );
          } catch (err) {
            console.log(`failed on file ${filePath}`);
            throw new Error(err);
          }
        }
      } else {
        console.log("skipped a file")
      }
    }
  } catch (err) {
    throw new Error(err);
  }
}

main().then(() => {
  console.log("done");
});
