// 获取DOM元素data属性
export function getData(element, dataName) {
  if (!element || !dataName) return;
  return element.getAttribute('data-' + dataName);
}
