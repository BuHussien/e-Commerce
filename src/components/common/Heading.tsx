interface IProps {
    prefix?: string;
    recordsLength: number;
}

const Heading = ({prefix,recordsLength}: IProps) => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-3 sm:mb-10 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-600">
          Explore our collection
        </p>

        <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
          {prefix
            ? `${prefix.replace(/-/g, " ")} Products`
            : "All Products"}
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
          Discover products you'll love from our collection.
        </p>
      </div>

      <span className="w-fit rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600">
        {recordsLength} Products
      </span>
    </div>
  );
};

export default Heading;
