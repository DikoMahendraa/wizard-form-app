"use client";

import { useState, useEffect } from "react";
import { X, Filter, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceCategories } from "@/lib/schema";

interface ServiceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: string[];
  onSave: (services: string[]) => void;
}

export function ServiceSelectorModal({
  isOpen,
  onClose,
  selectedServices,
  onSave,
}: ServiceSelectorModalProps) {
  const [services, setServices] = useState<string[]>(selectedServices);
  const [searchTerm, setSearchTerm] = useState("");

  // Reset selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setServices(selectedServices);
      setSearchTerm("");
    }
  }, [isOpen, selectedServices]);

  if (!isOpen) return null;

  // Toggle selection of a service
  const toggleService = (service: string) => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service));
    } else {
      setServices([...services, service]);
    }
  };

  // Get all services as a flat array
  const allServices = Object.values(serviceCategories).flatMap(
    (category) => category.options
  );

  // Filter services by search term
  const filteredCategories = Object.entries(serviceCategories).reduce(
    (acc, [key, category]) => {
      const filteredOptions = category.options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredOptions.length > 0) {
        acc[key] = {
          ...category,
          options: filteredOptions,
        };
      }

      return acc;
    },
    {} as typeof serviceCategories
  );

  // Save and close
  const handleSave = () => {
    onSave(services);
    onClose();
  };

  // Clear all selections
  const clearAll = () => {
    setServices([]);
  };

  // Select all filtered services
  const selectAllFiltered = () => {
    const filteredServices = Object.values(filteredCategories).flatMap(
      (category) => category.options
    );

    // Combine existing selections with filtered services
    const newSelections = [...new Set([...services, ...filteredServices])];
    setServices(newSelections);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Select Services
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search and Controls */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="text-sm text-gray-700">
              {services.length} of {allServices.length} selected
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearAll}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Clear all
              </button>
              <button
                onClick={selectAllFiltered}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {searchTerm ? "Select all filtered" : "Select all"}
              </button>
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div className="max-h-[400px] overflow-y-auto p-4">
          {Object.entries(filteredCategories).length > 0 ? (
            Object.entries(filteredCategories).map(([key, category]) => (
              <div key={key} className="mb-6 last:mb-0">
                <h3 className="text-md font-medium text-gray-900 mb-2">
                  {category.label}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {category.options.map((service) => (
                    <div
                      key={service}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 cursor-pointer transition-colors",
                        services.includes(service)
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50 border border-transparent"
                      )}
                      onClick={() => toggleService(service)}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-5 h-5 rounded border mr-3",
                          services.includes(service)
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        )}
                      >
                        {services.includes(service) && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              No services match your search
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
