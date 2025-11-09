"use client";

import React, { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus, Minus, LayoutGrid } from "lucide-react";

export default function MenuMobile({ menuItems }) {
  const [openStates, setOpenStates] = useState({});

  const toggleMenu = (id) => {
    setOpenStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMenu = (items, parentId = "0") => {
    const filteredItems = items.filter((item) => item.parent === parentId);

    if (filteredItems.length === 0) {
      return null;
    }

    return (
      <ul className="pl-4 space-y-2">
        {filteredItems.map((item) => {
          const hasChildren = items.some(
            (child) => child.parent === item.id.toString()
          );
          const isOpen = openStates[item.id] || false;

          return (
            <li key={item.id} className="pb-4 ">
              {hasChildren ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className="flex justify-between items-center w-full text-left text font-medium"
                  >
                    <span>{item.title}</span>
                    {isOpen ? (
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="pl-4 mt-6 text-sm ">
                      {renderMenu(items, item.id.toString())}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.url}
                  className="block text font-medium hover:underline"
                >
                  {item.title}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex flex-col items-center gap-y-2 ">
          <LayoutGrid size={20} />
          <span className="text-xs">دسته بندی‌</span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-screen md:hidden">
        <SheetHeader className="py-10">
          <SheetTitle className="text-center">دسته بندی‌ها</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          {menuItems.length > 0 ? (
            renderMenu(menuItems)
          ) : (
            <p>No menu items available</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
