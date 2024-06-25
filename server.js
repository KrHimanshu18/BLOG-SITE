import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    // console.log(response);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the sign-in page
app.get("/sign-in", (req, res) => {
  res.render("sign-in.ejs");
});

app.post("/sign-in", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/sign-in`, req.body);
    // console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating account." });
  }
});

// Route to render the edit page
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    // console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// To view a post
app.get("/view/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    // console.log(response.data);
    res.render("view.ejs", {
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    // console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  // console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    // console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

// Route to find all post by an author
app.get("/author", (req, res) => {
  res.render("author.ejs");
});

app.post("/author", async (req, res) => {
  try {
    // console.log(req.body);
    const response = await axios.post(`${API_URL}/author`, req.body);
    // console.log(response.data);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error getting posts." });
  }
});

// Route to find all post by an category
app.get("/category", (req, res) => {
  res.render("category.ejs");
});

app.post("/category", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/category`, req.body);
    // console.log(response.data);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error getting posts." });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
