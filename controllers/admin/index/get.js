module.exports = (req, res) => {
  res.render('admin/dashboard', {
    page: "admin/dashboard",
    title: "Admin",
    includes: {
      external: ["css", "admin_general_css", "fontawesome"]
    }
  });
};
