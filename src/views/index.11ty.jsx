const { renderToStaticMarkup: r } = require('react-dom/server')

module.exports = function () {
  return r(<></>)
}
