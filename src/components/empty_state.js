const EmptyState = () => {
  return (
    <div className="mt-20 text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <h3 className="mt-2 text-sm text-gray-900">No person added</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by adding a person.
      </p>
    </div>
  );
};

export default EmptyState;
