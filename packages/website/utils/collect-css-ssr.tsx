// collect-css-ssr.ts
import type { ModuleNode } from "vite";

export function getStylesTag(mod: ModuleNode | undefined) {
  const cssUrls = collectCss(mod);
  const result = [...cssUrls]
    .map(url => `<link type="text/css" rel="stylesheet" href="${url}">`)
    .join("");
  return result;
}

export function collectCss(
  mod: ModuleNode | undefined,
  preloadUrls: Set<string> = new Set(),
  visitedModules: Set<string> = new Set(),
) {
  if (!mod)
    return preloadUrls;
  if (!mod.url)
    return preloadUrls;
  if (visitedModules.has(mod.url))
    return preloadUrls;
  visitedModules.add(mod.url);
  if (mod.url.endsWith(".css") || (mod.id && /\?vue&type=style/.test(mod.id))) {
    preloadUrls.add(mod.url);
  }
  mod.importedModules.forEach((dep) => {
    collectCss(dep, preloadUrls, visitedModules);
  });
  return preloadUrls;
}
