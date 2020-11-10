const express = require("express"),
  app = express(),
  views_path = "D:/VS Code Programs/Node.js apps/Shaun Pelling/NodejsCrashCourse/sec_2_deep_dives/views";

// listening for requests
app.listen(3000);

// get requests
app.get("/", (request, response) => response.sendFile("/index.html", { root: views_path }));

app.get("/about", (request, response) => response.sendFile("/about.html", { root: views_path }));

// redirects
app.get("/about-us", (request, response) => response.redirect("/about"));

// 404: use() accepts all incoming requests, regardless of url paths, so it must be at the end of the file
app.use((request, response) => response.status(404).sendFile("/404.html", { root: views_path }));
