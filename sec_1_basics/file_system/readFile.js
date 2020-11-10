const fs = require("fs");

// readFile() is an async function
fs.readFile("./blog1.txt", (error, data) => {
  if (error) console.log(error);

  console.log(data, "|", data.toString());
});

console.log("rock bottom");
