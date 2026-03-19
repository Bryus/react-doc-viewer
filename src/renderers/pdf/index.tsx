import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { DocRenderer } from "../..";
import { useTranslation } from "../../hooks/useTranslation";
import PDFErrorIllustration from "./PDFErrorIllustration";

type PDFRendererError =
  | { kind: "missing-document" }
  | { kind: "fetch-failed"; status?: number }
  | { kind: "render-failed" };

const PDFRenderer: DocRenderer = ({
  mainState: { currentDocument, requestHeaders },
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<PDFRendererError | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [reloadVersion, setReloadVersion] = useState(0);

  const lastBlobUrlRef = useRef<string | null>(null);
  const requestIdRef = useRef(0);

  const revokeBlob = useCallback((url: string | null) => {
    if (url) {
      URL.revokeObjectURL(url);
    }
  }, []);

  useEffect(() => {
    if (!currentDocument?.uri) {
      setIsLoading(false);
      setError({ kind: "missing-document" });
      setBlobUrl(null);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    const requestId = ++requestIdRef.current;

    setIsLoading(true);
    setError(null);
    revokeBlob(lastBlobUrlRef.current);
    lastBlobUrlRef.current = null;
    setBlobUrl(null);

    fetch(currentDocument.uri, {
      method: "GET",
      signal,
      headers: requestHeaders,
    })
      .then(async (response) => {
        if (!response.ok) {
          const fetchError = new Error("Failed to load PDF");
          (
            fetchError as Error & {
              status?: number;
            }
          ).status = response.status;
          throw fetchError;
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(
          new Blob([blob], {
            type: blob.type || "application/pdf",
          }),
        );

        if (requestId !== requestIdRef.current) {
          URL.revokeObjectURL(url);
          return;
        }

        lastBlobUrlRef.current = url;
        setBlobUrl(url);
        setIsLoading(false);
        setError(null);
      })
      .catch((fetchError: { name?: string; status?: number }) => {
        if (fetchError?.name === "AbortError") return;

        setBlobUrl(null);
        setIsLoading(false);
        setError({
          kind: "fetch-failed",
          status:
            typeof fetchError?.status === "number"
              ? fetchError.status
              : undefined,
        });
      });

    return () => {
      controller.abort();
    };
  }, [currentDocument?.uri, reloadVersion, requestHeaders, revokeBlob]);

  useEffect(() => {
    return () => {
      revokeBlob(lastBlobUrlRef.current);
      lastBlobUrlRef.current = null;
    };
  }, [revokeBlob]);

  if (!currentDocument?.uri) {
    return (
      <PDFRendererErrorState
        title={t("pdfRendererErrorTitle")}
        description={t("pdfRendererDocumentNotFound")}
        retryLabel={t("pdfRendererRetryButton")}
        onRetry={() => setReloadVersion((value) => value + 1)}
      />
    );
  }

  if (isLoading) {
    return <PDFRendererLoadingState label={t("pdfRendererLoading")} />;
  }

  if (error || !blobUrl) {
    return (
      <PDFRendererErrorState
        title={t("pdfRendererErrorTitle")}
        description={getErrorDescription(error, t)}
        retryLabel={t("pdfRendererRetryButton")}
        onRetry={() => setReloadVersion((value) => value + 1)}
      />
    );
  }

  return (
    <Container id="pdf-renderer">
      <IFrame
        id="pdf-iframe"
        title={currentDocument.fileName || "pdf-preview"}
        src={blobUrl}
        onError={() => {
          setBlobUrl(null);
          setIsLoading(false);
          setError({ kind: "render-failed" });
        }}
      />
    </Container>
  );
};

const getErrorDescription = (
  error: PDFRendererError | null,
  t: ReturnType<typeof useTranslation>["t"],
) => {
  switch (error?.kind) {
    case "missing-document":
      return t("pdfRendererDocumentNotFound");
    case "render-failed":
      return t("pdfRendererRenderError");
    case "fetch-failed":
      return typeof error.status === "number"
        ? t("pdfRendererFetchErrorWithStatus", {
            status: error.status,
          })
        : t("pdfRendererFetchError");
    default:
      return t("pdfRendererFetchError");
  }
};

const PDFRendererLoadingState = ({ label }: { label: string }) => (
  <StatusContainer id="pdf-renderer-loading">
    <PreloaderContainer>
      <SpinnerContainer>
        <Spinner viewBox="0 0 50 50">
          <SpinnerPath cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
        </Spinner>
      </SpinnerContainer>
      <LoadingLabel>{label}</LoadingLabel>
    </PreloaderContainer>
  </StatusContainer>
);

const PDFRendererErrorState = ({
  title,
  description,
  retryLabel,
  onRetry,
}: {
  title: string;
  description: string;
  retryLabel: string;
  onRetry: () => void;
}) => (
  <StatusContainer id="pdf-renderer-error">
    <FatalErrorBlock>
      <PDFErrorIllustration />
      <FatalErrorTitle>{title}</FatalErrorTitle>
      <FatalErrorDescription>{description}</FatalErrorDescription>
    </FatalErrorBlock>
    <RetryButton type="button" onClick={onRetry}>
      <RefreshIcon />
      <span>{retryLabel}</span>
    </RetryButton>
  </StatusContainer>
);

const RefreshIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M17.651 6.35A7.95 7.95 0 0 0 12 4a8 8 0 1 0 7.75 10h-2.1A6 6 0 1 1 12 6c1.66 0 3.157.672 4.243 1.757L13 11h7V4l-2.349 2.35Z"
      fill="currentColor"
    />
  </svg>
);

PDFRenderer.fileLoader = ({ fileLoaderComplete }) => fileLoaderComplete();
PDFRenderer.fileTypes = ["pdf", "application/pdf"];
PDFRenderer.weight = 1;

export default PDFRenderer;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const IFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`;

const StatusContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 160px;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  background-color: transparent;
  box-sizing: border-box;
`;

const PreloaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const SpinnerContainer = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
`;

const Spinner = styled.svg`
  width: 48px;
  height: 48px;
  animation: ${rotate} 2s linear infinite;
`;

const SpinnerPath = styled.circle`
  stroke: #007aff;
  stroke-linecap: round;
  animation: ${dash} 1s ease-in-out infinite;
`;

const LoadingLabel = styled.div`
  width: max-content;
  margin-top: 16px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #22242a;
`;

const FatalErrorBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FatalErrorTitle = styled.span`
  display: inline-block;
  width: min(480px, 100%);
  margin-top: 20px;
  margin-bottom: 16px;
  white-space: pre-wrap;
  text-align: center;
  color: #22242a;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
`;

const FatalErrorDescription = styled.span`
  display: inline-block;
  width: min(480px, 100%);
  white-space: pre-wrap;
  text-align: center;
  color: #74777f;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
`;

const RetryButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 40px;
  height: 40px;
  padding: 0 20px;
  margin: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  background-color: #f3f4f6;
  color: #22242a;
  cursor: pointer;
  transition: 0.15s ease-in all;
  white-space: nowrap;
  user-select: none;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;

  &:hover,
  &:focus-visible {
    background-color: #e5e7eb;
  }

  &:focus-visible {
    outline: 2px solid #007aff;
    outline-offset: 2px;
  }

  &:active {
    background-color: #d6d8dd;
  }
`;
