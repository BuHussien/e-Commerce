import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

export const Error = () => {
  const error = useRouteError();

  let errorCode = "404";
  let errorMessage =
    "The page you're looking for doesn't exist or may have been moved.";

  if (isRouteErrorResponse(error)) {
    errorCode = String(error.status);

    errorMessage =
      error.status === 404
        ? "The page you're looking for doesn't exist or may have been moved."
        : error.statusText || "An unexpected error occurred. Please try again.";
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-rose-50/50 px-6 py-16">
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-pink-200/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-rose-200/50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/30 blur-3xl"
      />

      {/* Content */}
      <section className="relative w-full max-w-xl text-center">
        {/* Error icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-rose-100 bg-white shadow-lg shadow-rose-100/60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-9 w-9 text-rose-600"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 4h.01M10.3 3.9 2.8 17a2 2 0 0 0 1.74 3h14.92a2 2 0 0 0 1.74-3L13.7 3.9a2 2 0 0 0-3.48 0Z"
            />
          </svg>
        </div>

        {/* Error code */}
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-rose-600">
          Error {errorCode}
        </p>

        <h1 className="bg-linear-to-r from-pink-600 via-rose-600 to-red-500 bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-8xl">
          {errorCode}
        </h1>

        <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Oops! Something went wrong.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-500 sm:text-lg">
          {errorMessage}
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            replace
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-pink-600 to-rose-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition-all duration-200 hover:-translate-y-0.5 hover:from-pink-700 hover:to-rose-700 hover:shadow-xl hover:shadow-rose-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3 10 9-7 9 7M5 9v11h14V9M9 21v-7h6v7"
              />
            </svg>
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-rose-200 bg-white px-7 py-3 text-sm font-semibold text-rose-700 transition-all duration-200 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            Go Back
          </button>
        </div>

        {/* Footer */}
        <div className="mx-auto mt-12 h-px w-16 bg-linear-to-r from-pink-300 via-rose-400 to-red-300" />

        <p className="mt-5 text-sm text-gray-400">
          Sorry for the inconvenience. Please try again.
        </p>
      </section>
    </main>
  );
};
