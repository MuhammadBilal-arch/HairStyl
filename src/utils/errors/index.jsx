import React, { useState } from 'react';

const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  // Function to handle errors in child components
  const handleError = (error) => {
    // Update state to show the error message
    setError(error);
  };

  // Reset the error state when the component receives new children
  React.useEffect(() => {
    setError(null);
  }, [children]);

  if (error) {
    // Display the error message on the screen
    return <div>Something went wrong. Error: {error.message}</div>;
  }

  try {
    // If there's no error, render the child components as usual
    return children;
  } catch (error:any) {
    // If an error occurs, handle it and display the fallback UI
    handleError(error);
    return null; // or a fallback UI if required
  }
};

export default ErrorBoundary;
