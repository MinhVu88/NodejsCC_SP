const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  dotenv = require("dotenv"),
  port = process.env.PORT || 3000,
  blogRoutes = require("./routes/blogRoutes"),
  morgan = require("morgan");

dotenv.config({ path: "./config/config.env" });

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() =>
    app.listen(port, () => console.log(`server's running on port ${port}`))
  )
  .catch(error => console.log(error));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("../public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// basic routes
app.get("/", (request, response) => response.redirect("/blogs"));

app.get("/about", (request, response) =>
  response.render("about", { title: "About" })
);

// blog routes
app.use("/blogs", blogRoutes);

// 404
app.use((request, response) =>
  response.status(404).render("404", { title: "404" })
);
