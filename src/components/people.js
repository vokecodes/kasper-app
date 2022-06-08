import { Ranks } from "../config/ranks";

const People = ({
  people,
  handleUpdatePersonRank,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="lg:hidden py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="hidden lg:table-cell py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="hidden lg:table-cell py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <span className="">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {people.map((person) => {
                  const { id, firstName, lastName, rank } = person;
                  return (
                    <tr key={id}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                        {firstName}
                        <dl className="font-normal lg:hidden">
                          <dd className="mt-1 truncate text-gray-700">
                            {lastName}
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden lg:table-cell w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                        {lastName}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <select
                          className="max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) =>
                            handleUpdatePersonRank(e.target.value, id)
                          }
                          value={rank}
                        >
                          {Ranks.map((rank) => (
                            <option value={rank} key={rank}>
                              {rank}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleEdit(person)}
                        >
                          Edit
                        </button>
                        <button
                          className="ml-5 text-red-600 hover:text-indigo-900"
                          onClick={() => handleDelete(person)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;
