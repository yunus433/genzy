module.exports = (req, res) => {
  res.render('admin/login', {
    page: 'admin/login',
    title: 'Admin Login',
    includes: {
      external: ["css"]
    }
  });
};
