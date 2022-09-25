import { useClickOutside } from "@reactuses/core";
import { useRef, useState } from "react";
import Layout from "../Layout";

import file from "./README.md";

const Page = () => {
  return (
    <Layout file={file}>
      <Demo />
    </Layout>
  );
};

export default Page;

const Demo = () => {
  const [visible, setVisible] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => {
    setVisible(false);
  });

  return (
    <div>
      <button onClick={() => setVisible(true)}> Open Modal</button>
      {visible && (
        <div
          ref={modalRef}
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: 420,
            maxWidth: "100%",
            zIndex: 10,
            border: "1px solid var(--c-input-border)",
            background: "var(--c-bg)",
          }}
        >
          <div
            style={{
              padding: "0.4em 2em",
              boxShadow: "2px 2px 10px var(--c-box-shadow)",
            }}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: "1.4rem",
                marginBottom: "2rem",
              }}
            >
              Demo Modal
            </p>
            <p>Click outside of the modal to close it.</p>
          </div>
        </div>
      )}
    </div>
  );
};
