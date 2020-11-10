const fs = require("fs"),
  text1 = "I am a ninja",
  text2 = "calling writeFile() & passing it a nonexistent file create that file";

// writeFile() is an async function
fs.writeFile("./blog1.txt", text1, () => console.log(text1));

fs.writeFile("./blog2.txt", text2, () => console.log(text2));
