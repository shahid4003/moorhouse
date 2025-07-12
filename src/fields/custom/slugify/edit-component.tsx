"use client";

import { useEffect, useState } from "react";

export const EditComponent = ({ value, onChange, entry }: any) => {
  const [slug, setSlug] = useState(value || "");

  useEffect(() => {
    if (!value && entry?.title) {
      const generated = generateSlug(entry.title);
      setSlug(generated);
      onChange(generated);
    }
  }, [entry?.title]);

  const handleChange = (val: string) => {
    setSlug(val);
    onChange(val);
  };

  return (
    <input
      type="text"
      placeholder="Enter slug"
      value={slug}
      onChange={e => handleChange(e.target.value)}
    />
  );
};

function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-") // replace spaces with dashes
    .replace(/-+/g, "-"); // collapse multiple dashes
}
