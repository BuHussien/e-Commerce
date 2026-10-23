import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetSingleProduct from "@store/products/act/getSingleProduct";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  const { record, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(actGetSingleProduct(Number(id) as never));
    }
  }, [dispatch, id]);

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "dec") {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  // Skeleton Loader for Better UX
  if (loading === "pending") {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-4/5 bg-gray-200 rounded-3xl"></div>
          <div className="space-y-6">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-24 bg-gray-200 rounded w-full"></div>
            <div className="h-14 bg-gray-200 rounded-2xl w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !record) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          Sorry, we couldn't find the details for this product.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
        <Link to="/" className="hover:text-gray-900 transition-colors">
          Home
        </Link>
        <span className="text-gray-300">/</span>
        <Link to="/products" className="hover:text-gray-900 transition-colors">
          Products
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-semibold truncate max-w-50 sm:max-w-xs">
          {record?.title}
        </span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* LEFT - Image Gallery / Visuals */}
        <div className="w-full space-y-4">
          <div className="relative bg-linear-to-b from-gray-50 to-gray-100/50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm group">
            <div className="aspect-4/5 sm:aspect-square lg:aspect-4/5 w-full overflow-hidden">
              <img
                src={record?.img}
                alt={record?.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Category Tag */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/80 backdrop-blur-md text-gray-900 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm border border-white/50">
                {record?.cat_prefix}
              </span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlist(!isWishlist)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-md text-gray-700 hover:text-red-500 shadow-sm border border-white/50 transition-all duration-300 active:scale-90"
              aria-label="Add to wishlist"
            >
              <svg
                className={`w-5 h-5 transition-colors ${
                  isWishlist
                    ? "fill-red-500 stroke-red-500"
                    : "fill-none stroke-currentColor"
                }`}
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* Additional Meta Details */}
          <div className="flex items-center justify-between px-2 text-xs text-gray-400 font-medium tracking-wide">
            <span>Noor Store Collection</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              In Stock
            </span>
          </div>
        </div>

        {/* RIGHT - Product Details & Buying Section */}
        <div className="w-full lg:sticky lg:top-8">
          <div className="flex flex-col">
            {/* Brand Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase">
                NOOR STORE
              </span>
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {record?.cat_prefix}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
              {record?.title}
            </h1>

            {/* Price Card */}
            <div className="flex items-baseline gap-3 mt-5">
              <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                ${record?.price}
              </span>
              <span className="text-sm font-semibold text-gray-400">USD</span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-100 my-6" />

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Product Description
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                {record?.description}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 my-6">
              <div className="bg-gray-50/80 rounded-2xl p-3.5 border border-gray-100">
                <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold block">
                  Category
                </span>
                <p className="text-sm font-bold text-gray-800 mt-1 capitalize">
                  {record?.cat_prefix}
                </p>
              </div>
              <div className="bg-gray-50/80 rounded-2xl p-3.5 border border-gray-100">
                <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold block">
                  Collection
                </span>
                <p className="text-sm font-bold text-gray-800 mt-1">
                  Noor Essentials
                </p>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart Button */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 rounded-2xl p-1 bg-gray-50">
                  <button
                    onClick={() => handleQuantityChange("dec")}
                    className="w-10 h-10 rounded-xl bg-white text-gray-600 font-bold shadow-sm hover:bg-gray-100 transition-colors flex items-center justify-center active:scale-95"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("inc")}
                    className="w-10 h-10 rounded-xl bg-white text-gray-600 font-bold shadow-sm hover:bg-gray-100 transition-colors flex items-center justify-center active:scale-95"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button className="flex-1 bg-gray-900 hover:bg-black text-white py-3.5 px-6 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-xl active:scale-[0.98] group">
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l2.4 12.2a2 2 0 002 1.6h8.7a2 2 0 002-1.6L22 7H6"
                    />
                    <circle
                      cx="10"
                      cy="21"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                    <circle
                      cx="18"
                      cy="21"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Unique Selling Points / Trust Badges */}
            <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">
                  Easy Shopping
                </span>
              </div>

              <div className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">
                  Quality Assured
                </span>
              </div>

              <div className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-1.5">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">
                  Fast Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
