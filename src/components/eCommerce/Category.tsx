const Category = () => {
  return (
    <div className="group flex flex-col items-center cursor-pointer">
      <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-50 rounded-full overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-md group-hover:border-rose-200 group-hover:ring-4 group-hover:ring-rose-50 transition-all duration-300 flex items-center justify-center relative">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*exJGDxNr2Axk5L4P"
          alt="Category Name"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-rose-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>

      <h4 className="mt-4 text-base sm:text-lg font-bold text-gray-700 group-hover:text-rose-600 transition-colors duration-300 text-center">
        Men's Clothing
      </h4>
    </div>
  );
};

export default Category;
