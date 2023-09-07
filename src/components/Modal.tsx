import React from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  heading?: string;
}
const Modal: React.FC<ModalProps> = ({ children, onClose, heading }) => {
  return (
    <div
      id="defaultModal"
      tab-index="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center  bg-[rgba(148,163,184,0.6)]"
    >
      <div className="relative">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 min-h-[350px] max-w-[400px]">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-white">{heading}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap gap-[10px] justify-around p-[15px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
