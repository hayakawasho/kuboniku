class Scroll {
  constructor() {
    //
  }

  set(y: number) {
    window.scrollTo(0, y)
  }

  reset() {
    this.set(0)
  }

  move() {
    //
  }

  add() {
    //
  }

  remove() {
    //
  }
}

const scroll = new Scroll()
export { scroll }

class Scroller {}

class Scene {}

/*

, Ih = function() {
  function t() {
      var t = this;
      this._cnt = 0,
      this._moveVal = new Xo,
      this.old = new Qo,
      this.val = new Qo,
      this.rate = new Qo,
      this.power = new Qo,
      this.dist = new Qo,
      this.docSize = new d,
      this._tgWheel = new Qo,
      this.wheel = new Qo,
      this._updateHandler = this._update.bind(this),
      u.instance.add(this._updateHandler),
      window.addEventListener("wheel", (function(e) {
          t._tgWheel.y = e.deltaY
      }
      ))
  }
  return Object.defineProperty(t, "instance", {
      get: function() {
          return this._instance || (this._instance = new t),
          this._instance
      },
      enumerable: !1,
      configurable: !0
  }),
  t.prototype.set = function(t) {
      window.scrollTo(0, t)
  }
  ,
  t.prototype.move = function(t) {
      var e = this;
      Oh.instance.a(this._moveVal, {
          val: [this.val.y, t]
      }, 1, 0, pu.easeInOut, null, (function() {
          window.scrollTo(0, e._moveVal.val)
      }
      ))
  }
  ,
  t.prototype._update = function() {
      this._cnt++,
      this._cnt % 60 == 0 && (this.docSize.height = document.body.clientHeight),
      this.old.copy(this.val),
      this.val.y = window.pageYOffset || document.documentElement.scrollTop;
      var t = this.old.y - this.val.y;
      Math.abs(this.old.y - this.val.y) < 2 && (t = 0),
      this.power.y += .2 * (t - this.power.y),
      this.dist.y += .2 * (this.old.y - this.val.y - this.dist.y);
      this._tgWheel.y += .2 * (0 - this._tgWheel.y),
      this.wheel.y += .2 * (this._tgWheel.y - this.wheel.y)
  }
  ,
  t
}()
*/
