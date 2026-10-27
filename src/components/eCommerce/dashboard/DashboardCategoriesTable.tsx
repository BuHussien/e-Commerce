import type { TCategory } from "@customTypes/category";

interface IProps {
  categories: TCategory[];
  onEdit?: (categoty: TCategory) => void;
  onDelete?: (categoty: TCategory) => void;
}

const DashboardCategoryTable = ({ categories, onEdit, onDelete }: IProps) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-5">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Recent Categories</h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Manage your store categories
          </p>
        </div>

        <span className="inline-flex items-center rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600 ring-1 ring-inset ring-pink-500/10">
          {categories.length}{" "}
          {categories.length === 1 ? "Category" : "Categories"}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50/80 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {categories.length > 0 ? (
              categories.map((categoty) => (
                <tr
                  key={categoty.id}
                  className="transition-colors duration-150 hover:bg-gray-50/60"
                >
                  {/* Category Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      {categoty.img ? (
                        <img
                          src={categoty.img}
                          alt={categoty.title}
                          className="h-12 w-12 rounded-xl border border-gray-100 object-cover shadow-2xs"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xs font-medium text-gray-400">
                          N/A
                        </div>
                      )}

                      <div className="max-w-xs">
                        <p className="truncate font-semibold text-gray-900 hover:text-pink-600 transition-colors cursor-pointer">
                          {categoty.title}
                        </p>
                        <p className="mt-0.5 text-xs font-mono text-gray-400">
                          ID: #{categoty.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-center gap-2">
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(categoty)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                        >
                          Edit
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(categoty)}
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
                      No Categories found
                    </span>
                    <span className="text-xs text-gray-400">
                      Try adding some Categories to display here.
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

export default DashboardCategoryTable;
