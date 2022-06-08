import { Ranks } from "../config/ranks";

const AddPersonModal = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  addForm,
  handleHideAddForm,
}) => {
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-80 lg:w-1/2 my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="min-h-full flex flex-col justify-center py-12 px-8">
            <div className="mt-10 sm:mt-0">
              <div className="">
                <div className="md:mt-0 md:col-span-2">
                  <div className="mb-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {addForm
                        ? "Add User"
                        : `Edit ${values.firstName} ${values.lastName}`}
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div>
                      <div>
                        <div>
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          {errors.firstName && touched.firstName && (
                            <span className="text-sm text-red-500 mt-1">
                              {errors.firstName}
                            </span>
                          )}
                        </div>

                        <div className="mt-2">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          {errors.lastName && touched.lastName && (
                            <span className="text-sm text-red-500 mt-1">
                              {errors.lastName}
                            </span>
                          )}
                        </div>

                        <div className="mt-2">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Rank
                          </label>
                          <select
                            name="rank"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.rank}
                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          >
                            <option></option>
                            {Ranks.map((rank) => (
                              <option value={rank} key={rank}>
                                {rank}
                              </option>
                            ))}
                          </select>
                          {errors.rank && touched.rank && (
                            <span className="text-sm text-red-500 mt-1">
                              {errors.rank}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="pt-5 text-right">
                        <button
                          type="button"
                          className="w-24 lg:w-32 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={handleHideAddForm}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="w-24 lg:w-32 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          disabled={isSubmitting}
                        >
                          {addForm ? "Add" : "Update"}
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
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPersonModal;
