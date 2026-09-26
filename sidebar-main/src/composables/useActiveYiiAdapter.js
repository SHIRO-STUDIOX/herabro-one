import {
  normalizeRoute,
  getUrl,
  getQueryParams,
} from "../helpers/helperString";

export function useActiveYiiAdapter() {
  const getActiveItems = (items, currentRoute) => { // find activeItems based on mached route or regex
    const url = getUrl(currentRoute);
    const params = getQueryParams(currentRoute);

    const isActiveItem = (itemFullUrl, itemRegexPrefix, itemRegexItems, url, params) => {
      // itemFullUrl == item route + item query params
      const current = normalizeRoute(url);
      const itemUrl = normalizeRoute(getUrl(itemFullUrl));
      if (!itemFullUrl || !current) return false;
      const itemParams = getQueryParams(itemFullUrl);

      if (itemParams && Object.keys(itemParams).length > 0) {
        if(!itemRegexPrefix) {
          for (const key in itemParams) {
            if (!(key in params) || itemParams[key] !== params[key]) {
              return false;
            }
          }
        }
      }
      

      if (itemUrl === current) return true;

      const slashCount = (itemUrl.match(/\//g) || []).length;

      if (slashCount === 1) {
        const fullRoute1 = itemUrl + "/index";
        if (fullRoute1 === current) {
          return true;
        }
      }

      if (slashCount === 0) {
        const defaultController1 = "default";
        const defaultController2 = "site";
        const defaultAction = "index";
        
        let fullRoute2 = `${itemUrl}/${defaultController1}/${defaultAction}`;
        if (fullRoute2 === current) return true;

        const fullRoute3 = `${itemUrl}/${defaultController2}/${defaultAction}`;
        if (fullRoute3 === current) return true;

        const fullRoute4 = `${itemUrl}/index`;
        if (fullRoute4 === current) return true;

      }
      if (itemRegexItems != null && itemRegexPrefix != null) {
        
        itemRegexPrefix = normalizeRoute(getUrl(itemRegexPrefix)); // remove last slash
        const regex = new RegExp('^' + itemRegexPrefix + '/(' + itemRegexItems + ')(/.*|\\?.*)?$');
        if (regex.test(currentRoute)) return true;
      }

      return false;
    };
    const getActiveItemsList = (items, url, params) => {
      let bestMatch = null;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item?.items && item.items.length > 0) {
          const childPath = getActiveItemsList(item.items, url, params);
          if (childPath) {
            const match = [{id: item.id, key: item.key, label: item.label}, ...childPath];
            return match;
          }
        }

        if (item?.url && isActiveItem(item.url, item.regex_prefix ,item.regex_items, url, params) && item.items.length == 0) { // params = url query params
          const hasQuery = Object.keys(getQueryParams(item.url)).length > 0;
          if (!bestMatch) {
            bestMatch = [{id: item.id, key: item.key, label: item.label}];
          } else {
            const prevHasQuery =
              Object.keys(getQueryParams(items[bestMatch[0]]?.url)).length > 0;
            if (hasQuery && !prevHasQuery) {
              bestMatch = [{id: item.id, key: item.key, label: item.label}];
            }
          }
        }
      }
      return bestMatch;
    };

    return getActiveItemsList(items, url, params);
  };

  return { getActiveItems };
}
