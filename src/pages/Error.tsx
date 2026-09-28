import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const Error = () => {
  const error = useRouteError();
  
  let errorMessage = "Sorry, we couldn't find the page you're looking for.";
  let errorCode = "404";

  if (isRouteErrorResponse(error)) {
    errorCode = error.status.toString();
    errorMessage = error.data?.message || error.statusText;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-gray-200 tracking-widest">
        {errorCode}
      </h1>
      
      <div className="mt-4">
        <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
          Oops! Something went wrong.
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto">
          {errorMessage}
        </p>
      </div>

      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        replace={true}
      >
        Go back home
      </Link>
    </div>
  );
};
