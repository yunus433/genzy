module.exports = (req, res) => {
  return res.render('agreement/privacy', {
    page: 'agreement/privacy',
    title: 'Gizlilik Sözleşmesi',
    includes: {
      external: ['css']
    }
  });
}
