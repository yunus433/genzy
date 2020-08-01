module.exports = (req, res) => {
  return res.render('agreement/user', {
    page: 'agreement/user',
    title: 'Gizlilik Sözleşmesi',
    includes: {
      external: ['css']
    }
  });
}
