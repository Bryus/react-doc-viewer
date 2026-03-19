import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ButtonSecondary } from "../../components/common";
import { LoadingIcon } from "../../components/icons";
import { DocRenderer, IStyledProps } from "../..";

const PDFRenderer: DocRenderer = ({
  mainState: { currentDocument, requestHeaders },
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      setError("Document not found.");
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
          throw new Error(`Unable to load PDF (${response.status}).`);
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
      .catch((fetchError) => {
        if (fetchError?.name === "AbortError") return;

        setBlobUrl(null);
        setIsLoading(false);
        setError(fetchError?.message || "Unable to load PDF.");
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

  if (!currentDocument) return null;

  if (isLoading) {
    return (
      <LoadingContainer id="pdf-renderer-loading">
        <LoadingIconContainer>
          <LoadingIcon color="#444" size={40} />
        </LoadingIconContainer>
        <LoadingText>Loading PDF...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error || !blobUrl) {
    return (
      <ErrorContainer id="pdf-renderer-error">
        <ErrorTitle>Unable to preview this PDF.</ErrorTitle>
        <ErrorText>{error || "Unknown error."}</ErrorText>
        <RetryButton onClick={() => setReloadVersion((value) => value + 1)}>
          Retry
        </RetryButton>
      </ErrorContainer>
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
          setError("Unable to render this PDF in an iframe.");
        }}
      />
    </Container>
  );
};

PDFRenderer.fileLoader = ({ fileLoaderComplete }) => fileLoaderComplete();
PDFRenderer.fileTypes = ["pdf", "application/pdf"];
PDFRenderer.weight = 1;

export default PDFRenderer;

const spinAnim = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const IFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 160px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const LoadingIconContainer = styled.div`
  animation-name: ${spinAnim};
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const LoadingText = styled.div`
  color: #444;
  font-size: 14px;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 160px;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
`;

const ErrorTitle = styled.div`
  color: #222;
  font-size: 16px;
  font-weight: 600;
`;

const ErrorText = styled.div`
  color: #555;
  font-size: 14px;
`;

const RetryButton = styled(ButtonSecondary)`
  width: auto;
  height: auto;
  padding: 10px 16px;
  margin: 0;
  border-radius: 999px;
  box-shadow: none;
  font-size: 14px;
  color: ${(props: IStyledProps) => props.theme.textSecondary};
`;
