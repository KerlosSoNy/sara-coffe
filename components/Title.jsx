import React from "react";

export default function Title({ tag = "h1", children, className = "" }) {
  const Tag = tag;
  return <Tag className={className}>{children}</Tag>;
}
