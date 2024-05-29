'use client'

// import { useEffect } from 'react';
import "./errorstyle.scss";
import ContentWrapper from "@/components/contentWrapper/ContentWrapper";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  // }, [error]);

  return (
    <div className="pageNotFound">
        <ContentWrapper>
            <span className="bigText">404</span>
            <span className="smallText">Page not found!</span>
        </ContentWrapper>
    </div>
  );
}
