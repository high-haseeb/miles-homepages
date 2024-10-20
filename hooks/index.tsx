"use client";

import { useEffect, useState } from "react";

const useLoadScript = (src: string) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (document.querySelector(`script[src="${src}"]`)) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => setLoaded(false);

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [src]);

  return loaded;
};

export default useLoadScript;
