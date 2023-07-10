import { StaticRouter } from "react-router-dom/server";
import { renderToPipeableStream } from "react-dom/server";
import type { Response } from "express";
import App from "./App";
import Document from "./_Document";

export const render = (url: string, head: string, res: Response) => {
  const assetManifest = {
    main: "/src/main-web.tsx",
    // css: cssUrls,
  };
  const jsx = (
    <Document assets={assetManifest} head={head}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Document>
  );

  const stream = renderToPipeableStream(
    jsx,
    {
      bootstrapModules: ["/src/main-web.tsx"],
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        stream.pipe(res);
      },
    },
  );

  return stream;
};
