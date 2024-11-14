"use client";
import { useState, useRef, useEffect, MouseEvent } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Dispatch, SetStateAction } from "react";

interface CategoriesProps {
  categories: string;
  setCategories: Dispatch<SetStateAction<string>>;
}

const Categories = ({ categories, setCategories }: CategoriesProps) => {
  const allCategories = [
    "All",
    "Flowers",
    "Vegetables",
    "Trees",
    "Herbs",
    "Succulents",
    "Shrubs",
    "Bonsai",
    "Ornamentals",
    "Perennials",
    "Cacti",
    "Fruits",
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleToggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setCategories(category); // Update selected category
    setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside as any);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside as any);
    };
  }, []);

  const visibleCategories = allCategories.slice(0, 9);
  const dropdownCategories = allCategories.slice(9);

  return (
    <div className="flex items-center space-x-2 pt-1">
      <div className="flex items-center space-x-2 overflow-x-auto">
        {visibleCategories.map((category) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <span
            key={category}
            className={`px-3 py-1 text-sm whitespace-nowrap cursor-pointer ${
              categories === category ? "bg-green-700 text-white" : "text-white"
            }`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </span>
        ))}
      </div>

      {dropdownCategories.length > 0 && (
        <div ref={dropdownRef} className="relative">
          <button
            className={`flex items-center px-3 py-1 text-sm whitespace-nowrap ${
              showDropdown ? "bg-green-700 text-white" : ""
            } text-white`}
            onClick={handleToggleDropdown}
          >
            More
            <FiChevronDown
              className={`ml-1 transition-transform ${showDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {showDropdown && (
            <div className="absolute left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-10 w-40">
              {dropdownCategories.map((category) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <span
                  key={category}
                  className={`block px-4 py-2 text-sm cursor-pointer ${
                    categories === category
                      ? "bg-green-700 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
