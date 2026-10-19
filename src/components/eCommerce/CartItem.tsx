import type { TProduct } from "@customTypes/product";

interface IProps {
  product: TProduct;
  qnt: number;
}

const CartItem = ({ product, qnt }: IProps) => {
  return (
    <article
      key={product.id}
      className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_110px_100px] sm:items-center sm:gap-4"
    >
      {/* Product */}
      <div className="flex min-w-0 gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-28 sm:w-28">
          <img
            src={product.img}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-col items-start py-1">
          <p className="text-xs text-gray-400">{product.cat_prefix}</p>

          <h2 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-gray-900 sm:text-base">
            {product.title}
          </h2>

          <p className="mt-2 text-sm font-semibold text-rose-600">
            ${`${product.price}`}
          </p>

          <button
            type="button"
            className="mt-auto pt-2 text-xs font-medium text-gray-400 transition hover:text-rose-600"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Static Quantity */}
      <div className="flex items-center justify-between sm:justify-center">
        <span className="text-xs text-gray-400 sm:hidden">Quantity</span>

        <div className="flex h-9 items-center rounded-lg border border-gray-200">
          <button type="button" className="w-8 text-gray-500">
            −
          </button>
          <span className="min-w-8 text-center text-sm font-semibold text-gray-900">
            {qnt}
          </span>
          <button type="button" className="w-8 text-gray-500">
            +
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="flex items-center justify-between sm:justify-end">
        <span className="text-xs text-gray-400 sm:hidden">Total</span>
        <span className="text-sm font-bold text-gray-900">
          ${`${Number(product.price) * qnt}`}
        </span>
      </div>
    </article>
  );
};

export default CartItem;
