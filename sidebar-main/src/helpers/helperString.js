export function normalizeRoute(r) {
  let route = (Array.isArray(r)) ? r?.[0] : r
  if (!route) return "";
  
  if (route.startsWith("/")) {
    route = route.substring(1)
  }
  if (route.endsWith("/")) {
    route = route.substring(0, route.length - 1);
  }
  return route;
}

export function isFontAwesome(str) {
  return /^(fa[srlbd]? fa-)/.test(str.trim());
}

export function getQueryParams(url) {
  if (!url) {
    return {};
  }
  const [path, queryString] = url.split("?");
  if (!queryString) return {};

  const params = new URLSearchParams(queryString);
  return Object.fromEntries(params.entries());
}


export function getUrl(fullUrl) {
  if (!fullUrl) {
    return '';
  }
  const [path, queryString] = fullUrl.split("?");
  return path;
}
