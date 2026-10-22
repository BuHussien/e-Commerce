import { Suspense } from "react";

import LottieHandler from "./LottieHandler";

const PageSuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <LottieHandler type="wait" message="loading please wait.." />
      }
    >
      {children}
    </Suspense>
  );
};

export default PageSuspenseFallback;
