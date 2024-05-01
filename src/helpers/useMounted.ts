import { useEffect, useState } from 'react';

/** In a client-side component, re-render on the client side after hydration.
 * Useful when we want to render something else on the client side. See usage
 * for examples. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  return hydrated;
}
