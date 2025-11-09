// "use client";

// export default function AttributeFilter({
//   attributes,
//   defaultFilters,
//   onFilterChange,
// }) {
//   const handleCheckboxChange = (attributeName, option) => {
//     const currentValues = defaultFilters[attributeName] || [];
//     const updatedValues = currentValues.includes(option)
//       ? currentValues.filter((value) => value !== option) // Remove option
//       : [...currentValues, option]; // Add option

//     onFilterChange({ ...defaultFilters, [attributeName]: updatedValues });
//   };

//   return (
//     <div className="flex flex-col gap-6 mb-8">
//       {attributes.map((attribute) => (
//         <div key={attribute.name} className="flex flex-col gap-4">
//           <h3 className="font-bold">{attribute.label}</h3>
//           {attribute.options.map((option) => (
//             <label key={option} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={
//                   defaultFilters[attribute.name]?.includes(option) || false
//                 }
//                 onChange={() => handleCheckboxChange(attribute.name, option)}
//                 className="accent-blue-500"
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// "use client";

// export default function AttributeFilter({
//   attributes,
//   defaultFilters,
//   onFilterChange,
// }) {
//   const handleCheckboxChange = (attributeName, option) => {
//     const currentValues = defaultFilters[attributeName] || [];
//     const updatedValues = currentValues.includes(option)
//       ? currentValues.filter((value) => value !== option) // Remove option
//       : [...currentValues, option]; // Add option

//     const updatedFilters = {
//       ...defaultFilters,
//       [attributeName]: updatedValues,
//     };
//     onFilterChange(updatedFilters);
//   };

//   return (
//     <div className="flex flex-col gap-6 mb-8">
//       {attributes.map((attribute) => (
//         <div key={attribute.name} className="flex flex-col gap-4">
//           <h3 className="font-bold">{attribute.label}</h3>
//           {attribute.options.map((option) => (
//             <label key={option} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={
//                   defaultFilters[attribute.name]?.includes(option) || false
//                 }
//                 onChange={() => handleCheckboxChange(attribute.name, option)}
//                 className="accent-blue-500"
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function Filter({
  attributes,
  defaultFilters,
  onFilterChange,
  categories,
}) {
  const [filters, setFilters] = useState(defaultFilters);

  // Handle checkbox change for attributes or categories
  const handleCheckboxChange = (filterType, option) => {
    const currentValues = filters[filterType] || [];
    const updatedValues = currentValues.includes(option)
      ? currentValues.filter((value) => value !== option) // Remove option
      : [...currentValues, option]; // Add option

    const updatedFilters = { ...filters, [filterType]: updatedValues };
    setFilters(updatedFilters);
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Render attribute filters */}
      {attributes.map((attribute) => (
        <div key={attribute.name} className="flex flex-col gap-4">
          <h3 className="font-bold">{attribute.label}</h3>
          {attribute.options.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters[attribute.name]?.includes(option) || false}
                onChange={() => handleCheckboxChange(attribute.name, option)}
                className="accent-blue-500"
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      {/* Render category filter */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">دسته‌بندی‌ها</h3>
        {categories.map((category) => (
          <label key={category.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.categories?.includes(category.id) || false}
              onChange={() => handleCheckboxChange("categories", category.id)}
              className="accent-blue-500"
            />
            {category.name}
          </label>
        ))}
      </div>
    </div>
  );
}
