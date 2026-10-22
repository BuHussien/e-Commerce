import { Link } from "react-router-dom";
import LottieHandler from "@components/feedback/LottieHandler";

export const Error = () => {
  
  return (
    <main className="relative  flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
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
      <section className="relative w-full max-w-xl text-center ">
        {/* Error icon */}
        <LottieHandler type={"notFound"}/>
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
      </section>
    </main>
  );
};
