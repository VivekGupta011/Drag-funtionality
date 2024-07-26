import React from "react";
import img1 from "./../../public/Assets/img2 (10).jpg";
import img2 from "./../../public/Assets/img2 (11).jpg";
import img3 from "./../../public/Assets/img2 (5).jpg";
import img4 from "./../../public/Assets/img2 (6).jpg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (img: string, text: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const handleImageClick = (img: string, text: string) => {
    onSelect(img, text);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-bold mb-4">Select an Image</h2>
        <div className="flex flex-wrap gap-4">
          <div onClick={() => handleImageClick(img1.src, "Design 1")} className="cursor-pointer">
            <img src={img1.src} alt="Design 1" className="w-24 h-24 object-cover rounded-md" />
            <div className="text-center mt-2">Design 1</div>
          </div>
          <div onClick={() => handleImageClick(img2.src, "Design 2")} className="cursor-pointer">
            <img src={img2.src} alt="Design 2" className="w-24 h-24 object-cover rounded-md" />
            <div className="text-center mt-2">Design 2</div>
          </div>
          <div onClick={() => handleImageClick(img3.src, "Design 3")} className="cursor-pointer">
            <img src={img3.src} alt="Design 3" className="w-24 h-24 object-cover rounded-md" />
            <div className="text-center mt-2">Design 3</div>
          </div>
          <div onClick={() => handleImageClick(img4.src, "Design 4")} className="cursor-pointer">
            <img src={img4.src} alt="Design 4" className="w-24 h-24 object-cover rounded-md" />
            <div className="text-center mt-2">Design 4</div>
          </div>
        </div>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
