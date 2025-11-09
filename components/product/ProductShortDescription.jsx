"use client";

export default function ProductShortDescription({ description }) {
  if (!description) return null;

  return (
    <div className="prose [&_h2]:mb-4 [&_h3]:mb-4 [&_h4]:mb-4">
      <div
        className="text-gray-600"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
