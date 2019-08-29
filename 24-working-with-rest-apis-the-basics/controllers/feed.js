module.exports.get = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "First Post", content: "This is the first post!" }]
  });
}

module.exports.post = (req, res, next) => {
  const { title, content } = { ...req.body };

  res.status(201).json({
    message: "Post created successfully!",
    post: { id: new Date(), title, content }
  });
}