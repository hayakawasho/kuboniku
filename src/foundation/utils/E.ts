import E from '@unseenco/e';

E.prototype.once = function(name, callback) {
  const once = () => {
    this.off(name, once)
    callback()
  }

  return this.on(name, once)
}

export default new E();
