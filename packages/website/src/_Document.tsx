import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  assets: {
    main: string;
    css?: string[];
  };
  head: string;
}

export default function Document({ children, assets, head }: IProps) {
  return (
    <html lang="en">
      <head dangerouslySetInnerHTML={{ __html: head }} />
      <body>
        <div id="main">
          {children}
        </div>
        {/* <script type="module" src="/src/main-web.tsx"></script> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `assetManifest = ${JSON.stringify(assets)};`,
          }}
        />
      </body>
    </html>
  );
}
