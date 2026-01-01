export function nullish(value) {
  return value === null || value === undefined;
}

export const SortType = {
  BOOK: "book",
  ASCENDING: "asc",
  DESCENDING: "desc",
};

export const CircleType = {
  SHOW: "show",
  HIDE: "hide",
};

export const DesignType = {
  LIGHT: "light",
  DARK: "dark",
};

export const SortTypeBookOrder = [
  // 2장을 1장에 모아 인쇄할 경우 + 양면 인쇄
  4, 1, 2, 3,
  // 2번째
  8, 5, 6, 7,
  // 3번째
  12, 9, 10, 11,
];
