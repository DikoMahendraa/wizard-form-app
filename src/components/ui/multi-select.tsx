"use client";

import { useState, useRef, useEffect } from "react";
import { X, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  error?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  error,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter options based on search
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Toggle selection of an option
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  // Remove a selected option
  const removeOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the dropdown
    onChange(selected.filter((item) => item !== option));
  };

  // Clear all selected options
  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the dropdown
    onChange([]);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className={cn(
          "flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-pointer",
          error && "border-red-500",
          isOpen && "ring-2 ring-ring ring-offset-2"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1.5">
          {selected.length > 0 ? (
            selected.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
              >
                {item}
                <X
                  className="h-3.5 w-3.5 cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={(e) => removeOption(item, e)}
                />
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          {/* Input for searching */}
          {isOpen && (
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 outline-none min-w-[120px] bg-transparent"
              placeholder="Search..."
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          )}
        </div>
        <div className="flex items-center gap-1">
          {selected.length > 0 && (
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={clearAll}
            >
              Clear all
            </button>
          )}
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      {/* Error message */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="max-h-60 overflow-auto p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer",
                    selected.includes(option)
                      ? "bg-blue-50 text-blue-900"
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => toggleOption(option)}
                >
                  <span>{option}</span>
                  {selected.includes(option) && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-center text-gray-500">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
