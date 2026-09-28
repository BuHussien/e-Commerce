const Product = () => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col justify-center px-5 py-3 m-3 hover:-translate-y-1 hover:border-rose-500 ">
      <div className="relative w-full h-64 bg-gray-50 overflow-hidden flex justify-center items-center">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*exJGDxNr2Axk5L4P"
          alt="Product Title"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-2xl"
        />

        <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
          Sale
        </span>
      </div>

      <div className="p-5 flex flex-col grow">
        <h4 className="text-lg font-bold text-gray-800 mb-1 truncate">
          Wireless Headphones
        </h4>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          High-quality noise-canceling wireless headphones with long battery
          life.
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-extrabold text-gray-900">
            $99.<span className="text-sm text-gray-500">99</span>
          </span>

          <button className="bg-gray-100 hover:bg-rose-600 text-gray-800 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors duration-300 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
