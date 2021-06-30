const byId = (id: string) => {
  return document.getElementById(id);
};

const qs = (selector: string, el: Document | Element = document) => {
  return el.querySelector(selector);
};

const qsa = (selector: string, el: Document | Element = document) => {
  return Array.from(el.querySelectorAll(selector));
};

const prependChild = (parent: Element, el: Element) => {
  parent.insertBefore(el, parent.firstChild);
};

export { byId, qs, qsa, prependChild }
