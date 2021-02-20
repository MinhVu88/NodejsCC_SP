const blog_model = require("../models/blog");

function blog_index(request, response) {
	blog_model
		.find()
		.sort({ createdAt: -1 })
		.then(result => {
			response.render("blogs/index", { title: "All Blogs", blogs: result });
		})
		.catch(error => console.log(error));
}

function blog_details(request, response) {
	console.log(request.params.id);

	const id = request.params.id;

	blog_model
		.findById(id)
		.then(result => response.render("blogs/details", { blog: result, title: "Blog Details" }))
		.catch(error => response.status(404).render("404", { title: "Blog Not Found", error }));
}

function blog_create_get(request, response) {
	response.render("blogs/create", { title: "Create Blogs" });
}

function blog_create_post(request, response) {
	console.log(request.body);

	const blog_doc = new blog_model(request.body);

	blog_doc
		.save()
		.then(() => response.redirect("/blogs"))
		.catch(error => console.log(error));
}

function blog_delete(request, response) {
	const id = request.params.id;

	blog_model
		.findByIdAndDelete(id)
		.then(() => response.json({ redirect: "/blogs" }))
		.catch(error => console.log(error));
}

module.exports = {
	blog_index,
	blog_details,
	blog_create_get,
	blog_create_post,
	blog_delete
};
