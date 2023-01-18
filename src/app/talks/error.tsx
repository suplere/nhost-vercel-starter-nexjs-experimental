'use client';

// 'use client' marks this page as a Client Component
// https://beta.nextjs.org/docs/rendering/server-and-client-components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <p className="text-red-500">
      {error instanceof Error
        ? error.message
        : 'Unknown error occurred. Please try again later.'}
    </p>
  );
}
