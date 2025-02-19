import { DEFAULT_PARAM } from "~/src/js/core/param";
import { CircleType, SortType } from "~/src/js/core/type";

export const Root = (function generateRoot(target) {
  const root = window.document.createElement("div");
  root.className = "root";
  target.appendChild(root);
  return root;
})(window.document.body);

export function optimizeHTMLRoot(param = DEFAULT_PARAM) {
  const optionalClassList = [];
  switch (param.circle) {
    case CircleType.HIDE:
      optionalClassList.push("no-circle");
      break;
  }
  switch (param.sortType) {
    case SortType.BOOK:
      optionalClassList.push("book");
      break;
  }
  if (!optionalClassList.length) {
    return;
  }
  window.document.documentElement.classList.add(...optionalClassList);
}
