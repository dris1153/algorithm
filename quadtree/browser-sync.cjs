const browserSync = require("browser-sync");

const bs = browserSync.create();

bs.init({
  proxy: "localhost:3000",
  files: ["public/**/*", "views/**/*"],
  port: 3001,
  open: false,
  notify: false,
});
