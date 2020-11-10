// console.log(global);

global.setTimeout(() => {
  console.log("inside global.setTimeout()");

  clearInterval(interval);
}, 3000);

const interval = setInterval(() => console.log("inside setInterval()"), 1000);

console.log("__dirname:", __dirname);

console.log("__filename:", __filename);
