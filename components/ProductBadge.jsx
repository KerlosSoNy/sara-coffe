"use client";

import { Badge } from "@/components/ui/badge";
import { differenceInDays, parseISO } from "date-fns";

export default function ProductBadge({ createdAt }) {
  if (!createdAt) return null;

  const daysSinceCreated = differenceInDays(new Date(), parseISO(createdAt));
  const isNew = daysSinceCreated <= 15;

  return isNew ? (
    <Badge
      variant="default"
      className="absolute top-2 left-2 z-[999] bg-green-600 text-white font-adorealternate"
    >
      NEW
    </Badge>
  ) : null;
}
