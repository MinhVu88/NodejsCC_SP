const express = require("express"),
	morgan = require("morgan"),
	app = express(),
	mongoose = require("mongoose"),
	dotenv = require("dotenv"),
	port = process.env.PORT || 3000,
	blog_model = require("./models/blog");

// load env vars
dotenv.config({ path: "./config/config.env" });

// connect to mongodb (listen for requests only when connection to the db has been made successfully)
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => app.listen(port, () => console.log(`server's running on port ${port}`)))
	.catch(error => console.log(error));

// register view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// an user-defined requests-logging middleware
app.use((request, response, next) => {
	console.log(
		`A new request -> Host: ${request.hostname} | Path: ${request.path} | Method: ${request.method}`
	);

	next();
});

// use static (Express middleware for serving static files to the browser)
app.use(express.static("../public"));

// use morgan (a 3rd-party requests-logging middleware from npm)
app.use(morgan("dev"));

// mongodb & mongoose sandbox routes
app.get("/add-blog", (request, response) => {
	const blog_doc = new blog_model({
		title: "blog 0",
		snippet: "blog #0",
		body: "more about blog #0"
	});

	blog_doc
		.save()
		.then(result => response.send(result))
		.catch(error => console.log(error));
});

app.get("/all-blogs", (request, response) => {
	blog_model
		.find()
		.then(result => response.send(result))
		.catch(error => console.log(error));
});

app.get("/single-blog", (request, response) => {
	blog_model
		.findById("5f0bf8c46f0e614778a79ec8")
		.then(result => response.send(result))
		.catch(error => console.log(error));
});

// basic routes
app.get("/", (request, response) => {
	// const blogs = [
	//   { title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur" },
	//   { title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet consectetur" },
	//   { title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet consectetur" }
	// ];

	// response.render("index", { title: "Home", blogs });

	response.redirect("/blogs");
});

app.get("/about", (request, response) => response.render("about", { title: "About" }));

// blog routes
app.get("/blogs", (request, response) => {
	blog_model
		.find()
		.sort({ createdAt: -1 })
		.then(result => {
			response.render("index", { title: "All Blogs", blogs: result });
		})
		.catch(error => console.log(error));
});

app.get("/blogs/create", (request, response) =>
	response.render("create", { title: "Create Blogs" })
);

// 404
app.use((request, response) => response.status(404).render("404", { title: "404" }));
