"use client";
import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { FaArrowLeft } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiDotsNineBold } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import { designs } from "@/bin/CardsData";

// Sample tableData for initial state
const tableData = [
  {
    state: "Category 1",
    filters: [],
    designVariants: [{ img: null, text: "Add design" }],
  },
];

// Interface for design data
interface Design {
  img: any;
  text: string;
  description: string;
}

// Interface for state data
interface State {
  state: string;
  filters: string[];
  designVariants: Design[];
}

// Define the type for your data
const Table: React.FC = () => {
  const [data, setData] = useState<any[]>(tableData);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStateIndex, setCurrentStateIndex] = useState<number | null>(
    null
  );
  const [currentVariantIndex, setCurrentVariantIndex] = useState<number | null>(
    null
  );
  const [filterInput, setFilterInput] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Function to add a new filter to a state
  const addFilter = (index: number) => {
    if (filterInput.trim()) {
      setData((prevData) =>
        prevData.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              filters: [...item.filters, filterInput.trim()],
            };
          }
          return item;
        })
      );
      setFilterInput("");
    }
  };

  // Function to handle drag and drop events
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return; // No destination

    // Reorder states
    if (type === "state") {
      const reorderedStates = Array.from(data);
      const [movedState] = reorderedStates.splice(source.index, 1);
      reorderedStates.splice(destination.index, 0, movedState);
      setData(reorderedStates);
    }

    // Reorder design variants within a state
    if (type === "variant") {
      const stateIndex = parseInt(source.droppableId.split("-")[1], 10);
      const updatedStates = [...data];
      const [movedVariant] = updatedStates[stateIndex].designVariants.splice(
        source.index,
        1
      );
      updatedStates[stateIndex].designVariants.splice(
        destination.index,
        0,
        movedVariant
      );
      setData(updatedStates);
    }
  };

  // Function to add a new state
  const addState = () => {
    setData([
      ...data,
      {
        state: `Category ${data.length + 1}`,
        filters: [],
        designVariants: [{ img: null, text: "Add design" }],
      },
    ]);
    setCurrentIndex(data.length);
  };

  // Function to delete a state
  const deleteState = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  // Function to add a new variant column to a state
  const addVariantColumn = (stateIndex: number) => {
    setData((prevData) =>
      prevData.map((item, i) => {
        if (i === stateIndex) {
          return {
            ...item,
            designVariants: [
              ...item.designVariants,
              { img: null, text: "Add design" },
            ],
          };
        }
        return item;
      })
    );
  };

  // Function to handle click on "Add Filter" button
  const handleAddFilterClick = (index: any) => {
    setCurrentIndex(index);
    setShowFilterModal(true);
  };

  // Function to handle input change for filter input
  const handleFilterInputChange = (e: any) => {
    setFilterInput(e.target.value);
  };

  // Add scroll control for modal
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("no-scroll");
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("no-scroll");
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("no-scroll");
      document.body.classList.remove("modal-open");
    };
  }, [modalOpen]);

  // Function to handle filter submission
  const handleFilterSubmit = () => {
    if (filterInput.trim()) {
      setData((prevData) =>
        prevData.map((item, i) => {
          if (i === currentIndex) {
            return {
              ...item,
              filters: [...item.filters, filterInput.trim()],
            };
          }
          return item;
        })
      );
      setFilterInput("");
      setShowFilterModal(false);
    }
  };

  // Function to delete a variant column
  const deleteVariantColumn = (stateIndex: number, variantIndex: number) => {
    setData((prevData) =>
      prevData.map((item, i) => {
        if (i === stateIndex) {
          return {
            ...item,
            designVariants: item.designVariants.filter(
              (_: any, vi: number) => vi !== variantIndex
            ),
          };
        }
        return item;
      })
    );
  };

  // Function to handle click on "Add design" button
  const handleAddDesignClick = (stateIndex: number, variantIndex: number) => {
    setCurrentStateIndex(stateIndex);
    setCurrentVariantIndex(variantIndex);
    setModalOpen(true);
  };

  // Function to select a design for a variant
  const selectDesign = (design: Design) => {
    if (currentStateIndex !== null && currentVariantIndex !== null) {
      setData((prevData) =>
        prevData.map((item, i) => {
          if (i === currentStateIndex) {
            const updatedVariants = [...item.designVariants];
            updatedVariants[currentVariantIndex] = design;
            return {
              ...item,
              designVariants: updatedVariants,
            };
          }
          return item;
        })
      );
    }
    setModalOpen(false);
  };


  return (
    <div className=" pt-24 lg:pl-28 md:pl-20 sm:pl-16 pb-12 bg-white p-12">
      <div className="flex justify-between items-center mb-4 p-6">
        <div className="flex flex-row items-center space-x-6">
          <FaArrowLeft size="24" />
          <div className="relative">
            <h1 className="text-4xl font-medium pb-1 font-roboto">
              Rules creation
            </h1>
            <div className="absolute -left-5 bottom-0 w-[28rem] border-b-[2.3px] border-gray-400 pb-1"></div>
          </div>
        </div>
        <button className="bg-green-500 text-white px-5 py-3 rounded-md">
          Publish Feed
        </button>
      </div>

      <div className="bg-custom-background">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="states" type="state">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-custom-background bg-opacity-10 p-12 rounded-lg"
              >
                {data.map((item, index) => (
                  <Draggable
                    key={index}
                    draggableId={`state-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-4 bg-custom-background rounded-md "
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col items-center w-[5rem] p-2 space-y-4 min-w-[150px] group">
                            <button
                              onClick={() => deleteState(index)}
                              className="mt-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                              <RiDeleteBin6Line size="28" />
                            </button>
                            <div className="flex flex-row text-xl font-semibold">
                              <div className="text-4xl">{index + 1}</div>
                              <PiDotsNineBold
                                size="40"
                                style={{ marginLeft: "1px" }}
                              />
                            </div>
                          </div>
                          <div
                            className="bg-gray-200  h-[13.5rem] mx-6"
                            style={{ width: "2px" }}
                          ></div>

                          <div
                            className="w-[28rem] h-[13.5rem] min-w-[35rem] bg-white p-12 flex justify-center items-center border-dotted border-gray-200"
                            style={{ borderWidth: "3px" }}
                          >
                            <div className="p-2 rounded-md">
                              {item.filters.length === 0 && (
                                <button
                                  className="border p-2 rounded-md flex justify-center items-center space-x-3"
                                  onClick={() => handleAddFilterClick(index)}
                                >
                                  <LuPlus size="25" className="" />
                                  <span>Add Products Filters</span>
                                </button>
                              )}
                              {item.filters.length > 0 && (
                                <div className="flex flex-row">
                                  <div className="min-w-[10rem]">
                                    <div
                                      className="relative rounded-md"
                                      style={{
                                        minWidth: "120px",
                                        marginRight: "10px",
                                      }}
                                    >
                                      <h2 className="border border-solid relative left-[4%] p-1 text-balck rounded-md font-bold flex justify-center items-center text-[20px] space-x-1">
                                        tags
                                      </h2>
                                    </div>
                                  </div>
                                  <div className="min-w-[10rem]">
                                    <div
                                      className="relative rounded-md"
                                      style={{
                                        minWidth: "120px",
                                        marginRight: "10px",
                                      }}
                                    >
                                      <h2 className="border border-solid relative left-[4%] p-1 text-green-500 bg-green-50 rounded-md font-bold flex justify-center items-center text-[20px] space-x-1">
                                        contains
                                      </h2>
                                    </div>
                                  </div>
                                  <div className="min-w-[10rem]">
                                    <div
                                      className="relative rounded-md"
                                      style={{
                                        minWidth: "120px",
                                        marginRight: "10px",
                                      }}
                                    >
                                      <p
                                        className="border border-solid p-1 bg-white rounded-md font-bold flex justify-center items-center text-[20px] space-x-1 overflow-hidden whitespace-nowrap text-ellipsis"
                                      >
                                        {item.filters.join(", ")}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div
                            className="bg-gray-200  h-[13.5rem] mx-6"
                            style={{ width: "2px" }}
                          ></div>

                          <div className="flex-1 flex flex-col px-2 overflow-x-auto hide-scrollbar">
                            <Droppable
                              droppableId={`variants-${index}`}
                              type="variant"
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="variant-container flex overflow-x-auto hide-scrollbar"
                                  style={{ maxWidth: "100%" }}
                                >
                                  <div className="flex space-x-4 min-w-max">
                                    {item.designVariants.map((variant:any, vi:any) => (
                                      <Draggable
                                        key={vi}
                                        draggableId={`variant-${index}-${vi}`}
                                        index={vi}
                                      >
                                        {(provided) => (
                                          <>
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className="relative bg-white p-4 w-[12rem] h-[13.5rem] min-w-[14rem] border-dotted border-gray-200 rounded-md shadow-md flex flex-col justify-center items-center"
                                              style={{ borderWidth: "3px" }}
                                            >
                                              {variant.img ? (
                                                <div className="relative w-full h-32 flex items-center justify-center">
                                                  <img
                                                    src={variant.img?.src}
                                                    alt={`Design ${vi + 1}`}
                                                    className="w-full h-32 object-cover mb-2 rounded-md"
                                                  />

                                                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                                    <button onClick={() => {}}>
                                                      <FiEdit
                                                        size="24"
                                                        className="text-black"
                                                      />
                                                    </button>
                                                  </div>
                                                </div>
                                              ) : (
                                                <button
                                                  className="border border-solid p-2 rounded-md flex justify-center items-center space-x-1"
                                                  onClick={() =>
                                                    handleAddDesignClick(
                                                      index,
                                                      vi
                                                    )
                                                  }
                                                >
                                                  <LuPlus
                                                    size="25"
                                                    className=""
                                                  />
                                                  <span>Add design</span>
                                                </button>
                                              )}
                                              <p
                                                className="text-gray-600 text-sm overflow-hidden whitespace-nowrap text-ellipsis font-bold py-3"
                                                style={{ maxWidth: "140px" }}
                                              >
                                                {variant.description}
                                              </p>
                                            </div>

                                            <div
                                              className="bg-gray-200 h-[13.5rem] mx-12"
                                              style={{ width: "2px" }}
                                            ></div>
                                          </>
                                        )}
                                      </Draggable>
                                    ))}
                                    <div
                                      className="relative rounded-md flex justify-center items-center"
                                      style={{
                                        minWidth: "120px",
                                        marginRight: "10px",
                                      }}
                                    >
                                      <button
                                        onClick={() => addVariantColumn(index)}
                                        className="border border-solid p-3 bg-white rounded-md flex justify-center items-center space-x-1"
                                      >
                                        <LuPlus size="25" className="" />
                                      </button>
                                    </div>
                                  </div>
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <div className="min-w-[10rem]">
                  <div
                    className="relative   rounded-md "
                    style={{
                      minWidth: "120px",
                      marginRight: "10px",
                    }}
                  >
                    <button
                      onClick={addState}
                      className="border border-solid relative left-[4%] p-2.5 bg-white rounded-md flex justify-center items-center space-x-1"
                    >
                      <LuPlus size="25" className="" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Modal for selecting a design */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg w-full">
            <h2 className="text-2xl font-bold mb-4">
              Select a Design to Link
            </h2>
            <div className="overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 gap-4">
                {designs.map((design, index) => (
                  <div
                    key={index}
                    className="cursor-pointer p-4 border border-gray-300 rounded-lg flex flex-col justify-center items-center"
                    onClick={() => selectDesign(design)}
                  >
                    <img
                      src={design.img.src}
                      alt={design.text}
                      className="w-[70%] h-28 object-cover rounded-md mb-2 "
                    />
                    <div className="text-center mb-2">{design.text}</div>
                    <p className="text-gray-600 text-sm">
                      {design.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal for adding filter */}
      {showFilterModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg w-full space-x-4 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Add Filter</h2>
            <input
              type="text"
              value={filterInput}
              onChange={handleFilterInputChange}
              placeholder="Enter filter value"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleFilterSubmit}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md"
            >
              Add Filter
            </button>
            <button
              onClick={() => setShowFilterModal(false)}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
