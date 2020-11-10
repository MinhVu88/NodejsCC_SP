const fs = require("fs"),
  file_path_1 = "./blog2.txt",
  file_path_2 = "./blog3.txt",
  readStream = fs.createReadStream(file_path_1, { encoding: "utf8" }),
  writeStream = fs.createWriteStream(file_path_2);

readStream.pipe(writeStream);
