import { useRouteError } from "react-router-dom";

interface RouteError extends Error {
  statusText?: string;
  statusCode?: number;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError | null;
  
  console.error("Error:", error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error ? (error.statusText || error.message) : "Unknown Error"}</i>
      </p>
    </div>
  );
}
