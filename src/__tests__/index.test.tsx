import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import DocViewer, { DocViewerRenderers, PDFRenderer } from "../index";

import csvFile from "../exampleFiles/csv-file.csv?url";
import gifFile from "../exampleFiles/gif-image.gif?url";
import pngFile from "../exampleFiles/png-image.png?url";

test("renders component with no documents", () => {
  render(<DocViewer documents={[]} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
});

test("renders component with documents", () => {
  const docs = [
    { uri: pngFile },
    { uri: csvFile },
    { uri: gifFile },
  ];

  render(<DocViewer documents={docs} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
  expect(screen.getByText(`Document 1 of ${docs.length}`)).toBeDefined();
});

test("renders component with unsupported file type", () => {
  const docs = [{ uri: "", fileType: "application/postscript" }];
  render(<DocViewer documents={docs} />);

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();

  expect(
    screen.getByText("No renderer for file type: application/postscript"),
  ).toBeInTheDocument();
});

test("renders doc viewer with initialActiveDocument prop", () => {
  const docs = [{ uri: gifFile }, { uri: pngFile }];
  render(<DocViewer documents={docs} initialActiveDocument={docs[1]} />);

  const proxyRenderer = screen.getByTestId("proxy-renderer");

  expect(screen.getByTestId("react-doc-viewer")).toBeDefined();
  expect(screen.getByText(`Document 2 of ${docs.length}`)).toBeDefined();
  expect(proxyRenderer).toBeDefined();
  expect(proxyRenderer.querySelector("img")).toBeDefined();
});

test("registers the iframe-based PDF renderer", () => {
  expect(DocViewerRenderers).toContain(PDFRenderer);
  expect(PDFRenderer.fileTypes).toContain("application/pdf");
});

test("completes PDF fileLoader without using the default loader", () => {
  const fileLoaderComplete = vi.fn();

  PDFRenderer.fileLoader?.({
    documentURI: "https://example.com/document.pdf",
    signal: new AbortController().signal,
    fileLoaderComplete,
  });

  expect(fileLoaderComplete).toHaveBeenCalledTimes(1);
});
