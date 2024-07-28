"use client";
import React, { useState } from "react";
import { FilterModalProps } from "@/bin/CardsData";

const FilterModal: React.FC<FilterModalProps> = ({ onAddFilter, onClose }) => {
  const [filterInput, setFilterInput] = useState("");

  const handleFilterSubmit = () => {
    if (filterInput.trim()) {
      onAddFilter(filterInput.trim());
      setFilterInput("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg w-full space-x-4 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Add Filter</h2>
        <input
          type="text"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder="Enter filter value"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="flex justify-start space-x-4">
          <button
            onClick={handleFilterSubmit}
            className="px-6 py-2 bg-green-500 text-white rounded-md"
          >
            Add Filter
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
