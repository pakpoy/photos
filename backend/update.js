const Photo = require("./models/Photo");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const mime = require("mime-kind");
const moment = require("moment");
const exifr = require("exifr");

async function main() {
  try {
    console.log(moment().format())
    const allPhotos = await Photo.find().select("path");
    await fs.promises.mkdir(path.join("../thumbs/"), { recursive: true });
    const folder = await fs.promises.readdir(process.env.DIR_PHOTOS);
    for (let i = 0; i < folder.length; i++) {
      const thisFile = folder[i];
      const filePath = path.resolve(process.env.DIR_PHOTOS, thisFile);
      if (allPhotos.filter(e => e.path === filePath).length === 0) {
        const file = await fs.promises.readFile(filePath);
        const mimeType = await mime(filePath);
        if (mimeType && mimeType.mime === "image/jpeg") {
          try {
            const exif = await exifr.parse(file);
            const sharpBuffer = await sharp(file)
              .resize({ width: 800 })
              .grayscale()
              .toFormat("webp")
              .toBuffer();
            console.log(moment(exif["DateTimeOriginal"]).utcOffset(exif["OffsetTimeOriginal"]))
            const photoRecord = await Photo.findOneAndUpdate(
              { path: filePath },
              {
                exif,
                datePhotographedUTC: exif["DateTimeOriginal"],
                datePhotographedGrouping: moment(exif["DateTimeOriginal"]).format("YYYY/DDD"),
                datePhotographedLocalTZ: moment(exif["DateTimeOriginal"]).utcOffset(exif["OffsetTimeOriginal"]).format(),
                // datePhotographedGrouping: moment(
                //   exif["DateTime"].value[0],
                //   "YYYY:MM:DD HH:mm:ss"
                // ).format("YYYY/DDD"),
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



setInterval(function () {
  main().then(() => {
    console.log("done");
  }).catch((err) => {
    throw new Error(err);
  });
}, 600000);

