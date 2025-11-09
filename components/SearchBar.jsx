"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full flex items-center space-x-2 "
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="جستجو محصولات"
        className="min-w-[99%] md:min-w-[70%] text-sm md:text-base p-2 rounded-[12px] bg-gray-100 border border-gray-300 focus:outline-none  "
      />
      <span className="relative ">
        <button
          type="submit"
          className="absolute left-0 top-[-20px]  p-[.55rem] text-[#773D2D]"
        >
          <Search />
        </button>
      </span>
    </form>
  );
}
