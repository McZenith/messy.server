const indexControllers = {};

indexControllers.getIndex = (req, res, next) => {
  res.render("index", { title: "Express" });
};

module.exports = indexControllers;
