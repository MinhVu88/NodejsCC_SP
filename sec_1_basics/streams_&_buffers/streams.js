const fs = require("fs"),
  file_path_1 = "./blog1.txt",
  file_path_2 = "./blog2.txt",
  readStream = fs.createReadStream(file_path_1, { encoding: "utf8" }),
  writeStream = fs.createWriteStream(file_path_2);

readStream.on("data", chunk => {
  console.log("---- new chunk of data ----");

  console.log(chunk);

  writeStream.write("\n---- new chunk of data ----\n");

  writeStream.write(chunk);
});
