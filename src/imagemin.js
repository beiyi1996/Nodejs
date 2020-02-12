const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");
(async () => {
  await imagemin(["src/images/*.jpg"], {
    destination: "dist/images",
    plugins: [imageminJpegtran()]
  });

  console.log("Images optimized");
  //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
})();

// (async () => {
//   await imagemin(["src/images/*.jpg"], "build/images", { use: [imageminJpegtran()] }).then(() => {
//     console.log("Images optimized");
//   });
// })();

// (async () => {
//   await imagemin(["src/images/*.jpg"], "dist/build/images", {
//     use: [imageminMozjpeg()]
//   });

//   console.log("Images optimized");
// })();
