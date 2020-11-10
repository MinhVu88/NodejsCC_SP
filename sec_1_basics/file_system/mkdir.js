const fs = require("fs"),
  dir = "dir",
  dir_path = `./${dir}`;

if (!fs.existsSync(dir_path)) {
  fs.mkdir(dir_path, error => {
    if (error) console.log(error);

    console.log(`${dir} created`);
  });
} else {
  fs.rmdir(dir_path, error => {
    if (error) console.log(error);

    console.log(`${dir} removed`);
  });
}
