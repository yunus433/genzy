module.exports = (req, res) => {
  return res.render('index/index', {
    page: 'index/index',
    title: 'Para Kazanmanın En Kolay Yolu',
    includes: {
      external: ['css', 'fontawesome']
    }
  });
}
