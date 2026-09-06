"use client";

import { useMemo, useState } from "react";

type Props = {
  sources: Array<string | null | undefined>;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export default function ResilientImage({
  sources,
  alt,
  className,
  loading = "lazy",
  fetchPriority = "auto"
}: Props) {
  const candidates = useMemo(
    () => Array.from(new Set(sources.filter((item): item is string => Boolean(item)))),
    [sources]
  );
  const [index, setIndex] = useState(0);
  const src = candidates[index] ?? "/opinimiu-hero.webp";

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={() => {
        if (index < candidates.length - 1) setIndex((current) => current + 1);
      }}
    />
  );
}
