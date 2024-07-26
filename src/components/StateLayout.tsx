"use client";
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { FaArrowLeft } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiDotsNineBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import img1 from "./../../public/Assets/img1.jpg";
import img2 from "./../../public/Assets/img2.png";
import img3 from "./../../public/Assets/img3.png";
import img4 from "./../../public/Assets/img4.jpg";
import img5 from "./../../public/Assets/img5.jpg";
import img6 from "./../../public/Assets/img6.jpg";
import img7 from "./../../public/Assets/img7.jpg";
import img8 from "./../../public/Assets/img8.jpg";
import img9 from "./../../public/Assets/img9.jpg";
import img10 from "./../../public/Assets/img10.jpg";
import img11 from "./../../public/Assets/images 11.jpg";
import img12 from "./../../public/Assets/img12.jpg";
import img13 from "./../../public/Assets/img12.jpg";
import img14 from "./../../public/Assets/img14.jpg";

// Sample tableData for initial state
const tableData = [
  {
    state: "Category 1",
    filters: [],
    designVariants: [{ img: null, text: "Add design" }],
  },
];

const Table: React.FC = () => {
  const [newFilter, setNewFilter] = useState("");
  const [data, setData] = useState(tableData);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStateIndex, setCurrentStateIndex] = useState<number | null>(
    null
  );
  const [currentVariantIndex, setCurrentVariantIndex] = useState<number | null>(
    null
  );

  const addFilter = (index: number) => {
    if (newFilter.trim()) {
      setData((prevData) =>
        prevData.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              filters: [...item.filters, newFilter.trim()],
            };
          }
          return item;
        })
      );
      setNewFilter("");
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return; // No destination

    if (type === "state") {
      const reorderedStates = Array.from(data);
      const [movedState] = reorderedStates.splice(source.index, 1);
      reorderedStates.splice(destination.index, 0, movedState);
      setData(reorderedStates);
    }

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

  const addState = () => {
    setData([
      ...data,
      {
        state: `Category ${data.length + 1}`,
        filters: ["Filter"],
        designVariants: [{ img: null, text: "Add design" }], // Add a placeholder for new design
      },
    ]);
  };

  const deleteState = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const addVariantColumn = (stateIndex: number) => {
    setData((prevData) =>
      prevData.map((item, i) => {
        if (i === stateIndex) {
          return {
            ...item,
            designVariants: [
              ...item.designVariants,
              { img: null, text: "Add design" }, // Add a placeholder for new design
            ],
          };
        }
        return item;
      })
    );
  };

  const deleteVariantColumn = (stateIndex: number, variantIndex: number) => {
    setData((prevData) =>
      prevData.map((item, i) => {
        if (i === stateIndex) {
          return {
            ...item,
            designVariants: item.designVariants.filter(
              (_, vi) => vi !== variantIndex
            ),
          };
        }
        return item;
      })
    );
  };

  const handleAddDesignClick = (stateIndex: number, variantIndex: number) => {
    setCurrentStateIndex(stateIndex); // Set the current state index
    setCurrentVariantIndex(variantIndex); // Set the current variant index
    setModalOpen(true);
  };

  const selectDesign = (design: {
    img: string;
    text: string;
    description: string;
  }) => {
    if (currentStateIndex !== null && currentVariantIndex !== null) {
      setData((prevData) =>
        prevData.map((item, i) => {
          if (i === currentStateIndex) {
            const updatedVariants = [...item.designVariants];
            updatedVariants[currentVariantIndex] = design; // Update the specific variant
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

  const designs = [
    { img: img1, text: "Design 1", description: "Lorem, ipsum dolor1." },
    { img: img2, text: "Design 2", description: "Lorem, ipsum dolor2." },
    { img: img3, text: "Design 3", description: "Lorem, ipsum dolor3." },
    { img: img4, text: "Design 4", description: "Lorem, ipsum dolor4. " },
    { img: img5, text: "Design 1", description: "Lorem, ipsum dolor1." },
    { img: img6, text: "Design 2", description: "Lorem, ipsum dolor2." },
    { img: img7, text: "Design 3", description: "Lorem, ipsum dolor3." },
    // { img: img8, text: "Design 4", description: "Lorem, ipsum dolor4. " },
    // { img: img9, text: "Design 1", description: "Lorem, ipsum dolor1." },
    // { img: img10, text: "Design 2", description: "Lorem, ipsum dolor2." },
    // { img: img11, text: "Design 3", description: "Lorem, ipsum dolor3." },
    // { img: img12, text: "Design 4", description: "Lorem, ipsum dolor4. " },
    // { img: img13, text: "Design 3", description: "Lorem, ipsum dolor3." },
    // { img: img14, text: "Design 4", description: "Lorem, ipsum dolor4. " },
  ];

  return (
    <div className="p-4 pt-24 lg:pl-28 md:pl-20 sm:pl-16 pb-12 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-row items-center space-x-6">
          <FaArrowLeft size="24" />
          <div className="relative">
            <h1 className="text-2xl font-bold">Rules creation</h1>
            <div className="absolute -left-5 bottom-0 w-[20rem] border-b-[2.3px] border-gray-500 pb-1"></div>
          </div>
        </div>
        <button className="bg-green-500 text-white px-5 py-3 rounded-md">
          Publish Feed
        </button>
      </div>

      <div className="bg-[#F5F7F8] p-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="states" type="state">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-[#F5F7F8] bg-opacity-10 p-12 rounded-lg"
              >
                {/* <div className="flex flex-row text-lg font-medium mb-2">
                  <div className="w-1/4 min-w-[700px]"></div>
                  <div className="w-1/4 min-w-[700px]">Product Filter</div>
                  <div className="flex-1 flex justify-between overflow-x-auto">
                    <span className="flex-shrink-0">Primary Variant</span>
                    {
                      <BsThreeDotsVertical
                        size="30"
                        className="text-red-500"
                      />
                    }
                    <span className="flex-shrink-0">Variant 2</span>
                    {
                      <BsThreeDotsVertical
                        size="30"
                        className="text-gray-500"
                      />
                    }
                    <span className="flex-shrink-0">Variant N</span>
                  </div>
                </div> */}
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
                        className="mb-4 bg-[#F5F7F8] p-4 rounded-md "
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col items-center w-[10%] p-2 space-y-4 min-w-[150px] group">
                            <button
                              onClick={() => deleteState(index)}
                              className="mt-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                              <RiDeleteBin6Line size="28" />
                            </button>
                            <div className="flex flex-row text-xl font-semibold">
                              <div className="text-3xl">{index + 1}</div>
                              <PiDotsNineBold
                                size="30"
                                style={{ marginLeft: "1px" }}
                              />
                            </div>
                          </div>

                          <div className="w-[28rem] h-[13.5rem] min-w-[30rem] bg-white p-12 mr-16 flex justify-center items-center">
                            <div className="p-2 rounded-md">
                              {/* {item.filters.join(", ")} */}
                              <button
                                className="border p-2 rounded-md flex justify-center items-center space-x-3"
                                // onClick={() => handleAddDesignClick(index, vi)}
                              >
                                <LuPlus size="25" className="" />
                                <span>Add Products Filters</span>
                              </button>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col px-2 overflow-x-auto hide-scrollbar">
                            <Droppable
                              droppableId={`variants-${index}`}
                              type="variant"
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="variant-container overflow-x-auto"
                                  style={{ maxWidth: "100%" }}
                                >
                                  <div
                                    className="flex space-x-4"
                                    style={{ minWidth: "100%" }}
                                  >
                                    {item.designVariants.map((variant, vi) => (
                                      <Draggable
                                        key={vi}
                                        draggableId={`variant-${index}-${vi}`}
                                        index={vi}
                                      >
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="bg-white p-4 w-[12rem] h-[13.5rem] min-w-[14rem] border border-gray-300 rounded-md shadow-md flex flex-col justify-center items-center"
                                          >
                                            {variant.img ? (
                                              <img
                                                src={variant.img?.src}
                                                alt={`Design ${vi + 1}`}
                                                className="w-full h-32 object-cover mb-2 rounded-md"
                                              />
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
                                              className="text-gray-600 text-sm overflow-hidden whitespace-nowrap text-ellipsis"
                                              style={{ maxWidth: "120px" }}
                                            >
                                              {variant.description}
                                            </p>
                                          </div>
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
                    }} // Added margin-right for spacing
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

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Select a Design to Link</h2>
            <div className="overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 gap-4">
                {designs.map((design, index) => (
                  <div
                    key={index}
                    className="cursor-pointer p-4 border border-gray-300 rounded-lg"
                    onClick={() => selectDesign(design)}
                  >
                    <img
                      src={design.img.src}
                      alt={design.text}
                      className="w-full h-32 object-cover rounded-md mb-2"
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
    </div>
  );
};

export default Table;
