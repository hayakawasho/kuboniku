const { renderToStaticMarkup: r } = require('react-dom/server')

module.exports = function () {
  return r(
    <>
      <div>
        <div className="o-wrap">
          <h1 className="works-heading">
            Works
            <sup>{total}</sup>
          </h1>
        </div>

        <div id="js-works" className="works-entries | o-grid" dataTotal={total}>
          {pagination.items.map(item => {
            return (
              <article className="o-grid__item">
                <a href={`./${i.slug}/`}>
                  <div className="u-absolute u-pos-tl u-fit">
                    <div className="works-eyecatch">
                      <img src="" alt="" />
                    </div>
                    <div className="works-entry__hgroup">
                      <p>
                        {
                          // (total - loop.index0) | zeroPadding("2")
                        }
                        <span>Project</span>
                      </p>
                      <h2>{}</h2>
                    </div>
                  </div>
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </>
  )
}
