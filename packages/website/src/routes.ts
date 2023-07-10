import React from "react";
import routesJSON from "./routes.json";

interface Menu {
  title: string;
  items: string[];
}

export const menuGroup: Menu[] = routesJSON.main;

const pages = menuGroup
  .reduce((pre: string[], cur) => {
    pre.push(...cur.items);
    return pre;
  }, [])
  .map((page) => {
    return {
      // FIX ME should not return loading... in renderToString()
      // eslint-disable-next-line react/no-children-prop
      element: React.createElement(React.Suspense, { children: React.createElement(React.lazy(() => import(`../node_modules/@reactuses/core/hooks/${page}/README.md`))) }),
      page,
    };
  });

const routes = menuGroup.reduce((pre: string[], cur) => {
  pre.push(...cur.items);
  return pre;
}, []);

export { pages, routes };
