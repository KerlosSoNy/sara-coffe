"use client";

export default function SortFilter({
  defaultSort = "menu_order-asc",
  onFilterChange,
}) {
  const sortOptions = [
    { label: "پیش‌فرض", value: "menu_order-asc" },
    { label: "قیمت: کم به زیاد", value: "price-asc" },
    { label: "قیمت: زیاد به کم", value: "price-desc" },
    { label: "جدیدترین", value: "date-desc" },
    { label: "قدیمی‌ترین", value: "date-asc" },
  ];

  const handleClick = (value) => {
    if (onFilterChange) {
      const [sortBy, sortOrder] = value.split("-");
      onFilterChange({ sortBy, sortOrder });
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <p className="text-sm">مرتب سازی:</p>
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={` text-sm rounded p-1 ${
            defaultSort === option.value
              ? "bg-[#BDDFCF] text-black"
              : "bg-white text-gray-700 hover:bg-gray-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
