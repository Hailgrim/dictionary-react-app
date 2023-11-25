import React from 'react';
import { useRouteError } from "react-router-dom";

const ErrorAlert: React.FunctionComponent = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <span>Error</span>
  );
};
export default ErrorAlert;
