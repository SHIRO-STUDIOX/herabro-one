import { useAppStore } from "../app/store.js";

function filterItems(items, search, currentPath = '') {
  const filtered = [];
  items.forEach(item => {
    const labelMatch = item.label && item.label.toLowerCase().includes(search.toLowerCase());
    const codeMatch = item.code && String(item.code).toLowerCase().includes(search.toLowerCase());
    const urlMatch = item.url && item.url.toLowerCase().includes(search.toLowerCase())
    const isLeaf = !item.items || item.items.length === 0;
    const newPath = currentPath ? currentPath + ' / ' + item.label : item.label;

    let childMatches = [];
    if (item.items && Array.isArray(item.items)) {
      childMatches = filterItems(item.items, search, newPath);
    }

    if ((labelMatch || codeMatch || urlMatch) && isLeaf) {
      filtered.push({
        ...item,
        breadcrumb: currentPath,
        items: []
      });
    } else if ((labelMatch || codeMatch) && !isLeaf) {
      const leafDescendants = getAllLeafItems(item.items, newPath);
      filtered.push(...leafDescendants);
    } else if (childMatches.length > 0) {
      filtered.push(...childMatches);
    }
  });
  return filtered;
}

function getAllLeafItems(items, currentPath = '') {
  const leaves = [];
  items.forEach(item => {
    const newPath = currentPath ? currentPath + ' / ' + item.label : item.label;

    if (!item.items || item.items.length === 0) {
      leaves.push({
        ...item,
        breadcrumb: currentPath,
        items: []
      });
    } else {
      leaves.push(...getAllLeafItems(item.items, newPath));
    }
  });
  return leaves;
}

export function searchInMenu(modules, allItems, search) {
  
  const result = [];
  modules.forEach((module) => {
    const moduleItems = allItems.filter((item) => item.module === module.key);
    const filteredItems = filterItems(moduleItems || [], search);
    (module.label || "").toLowerCase().includes(search.toLowerCase())
    if (
      filteredItems.length > 0 ||
      (module.label || "").toLowerCase().includes(search.toLowerCase())
    ) {
      result.push({
        label: module.label,
        icon: module.icon,
        url: module.url,
        items: filteredItems,
      });
    }
  });
  return result;
}

export function highlightText(text, value) {
    const escapedValue = value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedValue, 'gi');
    return text.replace(regex, match => `<span class="found-text">${match}</span>`);
}
