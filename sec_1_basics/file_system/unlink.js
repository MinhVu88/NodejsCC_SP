const fs = require("fs"),
  file = "fsociety.txt",
  file_path = `./${file}`;

if (fs.existsSync(file_path)) {
  fs.unlink(file_path, error => {
    if (error) console.log(error);

    console.log(`${file} removed`);
  });
} else {
  fs.writeFile(file_path, "control is an illusion", () => console.log(`${file} created`));
}
