"use client";
import React, { useState, useMemo, useCallback } from "react";
import { FaSearch } from "react-icons/fa";

interface Design {
  img: { src: string };
  text: string;
  description: string;
}

interface DesignSelectionModalProps {
  designs: Design[];
  onSelect: (design: Design) => void;
  onClose: () => void;
}

const DesignItem: React.FC<{ design: Design; onSelect: (design: Design) => void }> = React.memo(({ design, onSelect }) => (
  <div
    className="cursor-pointer p-4 border border-gray-300 rounded-lg flex flex-col justify-center items-center"
    onClick={() => onSelect(design)}
  >
    <img
      src={design.img.src}
      alt={design.text}
      className="w-[70%] h-28 object-cover rounded-md mb-2"
    />
    <div className="text-center mb-2">{design.text}</div>
    <p className="text-gray-600 text-sm">{design.description}</p>
  </div>
));

const DesignSelectionModal: React.FC<DesignSelectionModalProps> = ({
  designs,
  onSelect,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Debounce the search input to reduce the number of filter operations
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredDesigns = useMemo(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    return designs.filter(design =>
      design.description.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm, designs]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Select a Design to Link</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search designs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border border-gray-300 rounded-md pl-10"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDesigns.length > 0 ? (
              filteredDesigns.map((design, index) => (
                <DesignItem key={index} design={design} onSelect={onSelect} />
              ))
            ) : (
              <p className="text-center col-span-full">No designs found</p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DesignSelectionModal;
