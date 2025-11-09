"use client";

import { useState, useEffect } from "react";

export default function VariantSelector({
  product,
  variants,
  onVariantChange,
}) {
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const attributeGroups = product.attributes
    .filter((attr) => attr.variation && attr.visible)
    .sort((a, b) => a.position - b.position)
    .map((attr) => ({
      name: attr.name,
      options: attr.options,
    }));

  // 🧠 Watch for variant match
  useEffect(() => {
    const matchedVariant = variants.find((variant) =>
      variant.attributes.every(
        (attr) => selectedAttributes[attr.name] === attr.option
      )
    );
    if (onVariantChange) onVariantChange(matchedVariant);
  }, [selectedAttributes, onVariantChange, variants]);

  useEffect(() => {
    // Only try to match if all attribute groups have a selection
    const allSelected = attributeGroups.every(
      (group) => selectedAttributes[group.name]
    );
    if (!allSelected) {
      if (onVariantChange) onVariantChange(null);
      return;
    }
    // Find the variant that matches all selected attributes
    const matchedVariant = variants.find((variant) =>
      attributeGroups.every((group) => {
        const attr = variant.attributes.find((a) => a.name === group.name);
        if (!attr) return false;
        // Normalize for case and whitespace
        return (
          attr.option.trim().toLowerCase() ===
          selectedAttributes[group.name].trim().toLowerCase()
        );
      })
    );
    if (onVariantChange) onVariantChange(matchedVariant || null);
  }, [selectedAttributes, onVariantChange, variants, attributeGroups]);

  const handleSelect = (attrName, option) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attrName]: option,
    }));
  };

  return (
    <div className="mb-10 font-montserrat">
      {attributeGroups.map((group) => (
        <div key={group.name} className="mb-4">
          <p className="mb-2 font-medium text-gray-700">Choose: {group.name}</p>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => {
              const isSelected = selectedAttributes[group.name] === option;
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(group.name, option)}
                  className={`px-10 py-2 rounded-sm border text-sm ${
                    isSelected
                      ? "bg-gray-200 border  text-[#385140] border-[#385140]"
                      : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
