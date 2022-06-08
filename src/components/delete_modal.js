import React from "react";

const DeleteModal = ({
  person,
  onCancelClick,
  onDeleteClick,
  isSubmitting,
}) => {
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-1/4 my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md flex items-center">
              <h2 className="flex-1 mt-6 text-center text-3xl font-extrabold text-gray-900">
                Delete {person.firstName} {person.lastName}
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={onCancelClick}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                className="w-32 mr-5 inline-flex items-center justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-black shadow-sm 2"
                onClick={onCancelClick}
              >
                NO
              </button>
              <button
                type="button"
                className="w-32 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm"
                onClick={onDeleteClick}
              >
                {isSubmitting && (
                  <svg
                    className="animate-spin ml-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 12 12"
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="3"
                      stroke="#fff"
                      strokeWidth="4"
                    ></circle>
                    <path
                      fill="#083018"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
