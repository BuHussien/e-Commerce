import type { TProduct } from "@customTypes/product";
import { addToCart } from "@store/cart/cartSlice";
import { useAppDispatch } from "@store/hooks";
import { memo, useState } from "react";
import WishList from "@assets/svg/wishlist.svg?react";
import FilledWishList from "@assets/svg/filledWishlist.svg?react";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";

const Product = ({ id, img, title, price, cat_prefix, description, isLiked, isUserAccess}: TProduct & { isLiked: boolean, isUserAccess?: boolean }) => {

  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleAddToCartClick = () => {
    if (isDisabled) return;

    setIsDisabled(true);
    dispatch(addToCart(id));

    setTimeout(() => {
      setIsDisabled(false);
    }, 1000);
  };
  
  const likeToggleHandler = () => {
    if(isUserAccess)
      dispatch(actLikeToggle(id));
    else
      return navigate('/login')
  };
  const navigate = useNavigate();
  const onProductClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col justify-center px-3 py-3 m-3 hover:-translate-y-1 hover:border-rose-500">
      <div
        className="absolute top-5 right-5 z-1 cursor-pointer rounded-full p-2 hover:bg-pink-300"
        onClick={likeToggleHandler}
      >
        {isLiked ? <FilledWishList /> : <WishList />}
      </div>
      <div className="relative w-full h-64 bg-gray-50 overflow-hidden flex justify-center items-center cursor-pointer" onClick={onProductClick}>
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-2xl"
        />

        <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
          {cat_prefix}
        </span>
      </div>

      <div className="p-2 flex flex-col grow" >
        <h4 className="text-sm font-bold text-gray-800 mb-2 truncate cursor-pointer" onClick={onProductClick}>
          {title}
        </h4>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-extrabold text-gray-900">
            $<span className="text-md text-gray-800">{price}</span>
          </span>

          <button
            className="bg-gray-100 hover:bg-rose-600 text-gray-800 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors duration-300 flex items-center gap-2"
            onClick={handleAddToCartClick}
            disabled={isDisabled}
          >
            {isDisabled ? (
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin"
              >
                <path
                  d="M4.97498 12H7.89998"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.8 5V8"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M18.625 12H15.7"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.8 19V16"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6.97374 16.95L9.04203 14.8287"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6.97374 7.05001L9.04203 9.17133"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M16.6262 7.05001L14.5579 9.17133"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M16.6262 16.95L14.5579 14.8287"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
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
            )}
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Product);
