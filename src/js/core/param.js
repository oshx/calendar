function paramReducer(param, pair, index, array) {
  const [key, value] = pair.split("=");
  param[decodeURIComponent(key)] = decodeURIComponent(value);
  return param;
}

export function extractParam(param = {}) {
  return window.location.search
    .substring(1)
    .split("&")
    .reduce(paramReducer, param);
}

export const DEFAULT_PARAM = {
  sortType: null,
  year: null,
  circle: null,
};
