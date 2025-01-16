export function scrollToCurrentMonth(year, month) {
  const current = new Date();
  year = year || current.getFullYear();
  month = month || current.getMonth() + 1;
  const element = window.document.getElementById(`_${year}_${month}`);
  return setTimeout(function behaveScroll() {
    if (!element) {
      return;
    }
    return window.document.body.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  }, 0);
}
