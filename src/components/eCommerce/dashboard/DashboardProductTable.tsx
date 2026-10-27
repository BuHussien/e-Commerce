import type { TProduct } from "@customTypes/product";

interface IProps {
  products: TProduct[];
  onEdit?: (product: TProduct) => void;
  onDelete?: (product: TProduct) => void;
}

const DashboardProductTable = ({ products, onEdit, onDelete }: IProps) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-5">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Recent Products</h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Manage your store products and inventory
          </p>
        </div>

        <span className="inline-flex items-center rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600 ring-1 ring-inset ring-pink-500/10">
          {products.length} {products.length === 1 ? "Product" : "Products"}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50/80 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="transition-colors duration-150 hover:bg-gray-50/60"
                >
                  {/* Product Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      {product.img ? (
                        <img
                          src={product.img}
                          alt={product.title}
                          className="h-12 w-12 rounded-xl border border-gray-100 object-cover shadow-2xs"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xs font-medium text-gray-400">
                          N/A
                        </div>
                      )}

                      <div className="max-w-xs">
                        <p className="truncate font-semibold text-gray-900 hover:text-pink-600 transition-colors cursor-pointer">
                          {product.title}
                        </p>
                        <p className="mt-0.5 text-xs font-mono text-gray-400">
                          ID: #{product.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 border border-gray-200/50">
                      {product.cat_prefix}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ${Number(product.price).toFixed(2)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-center gap-2">
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(product)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                        >
                          Edit
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(product)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="font-medium text-gray-700">
                      No products found
                    </span>
                    <span className="text-xs text-gray-400">
                      Try adding some products to display here.
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DashboardProductTable;
