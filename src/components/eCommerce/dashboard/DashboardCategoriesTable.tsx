import { useForm } from "react-hook-form";
import Modal from "@components/common/Modal";
import Input from "@components/forms/Input";
import type { TCategory } from "@customTypes/category";
import { useAppDispatch } from "@store/hooks";
import actUpdateCategory from "@store/categories/atc/actUpdateCategory";
import actDeleteCategory from "@store/categories/atc/actDeleteCategory";

interface IProps {
  categories: TCategory[];
}

type CategoryFormValues = {
  title: string;
  prefix: string;
  img: string;
};

const DashboardCategoryTable = ({ categories }: IProps) => {
  const dispatch = useAppDispatch();

  // Form hooks for Edit
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    setValue: setEditValue,
    formState: { errors: editErrors },
  } = useForm<CategoryFormValues>();

  // Open Edit and set default values
  const handleOpenEdit = (category: TCategory) => {
    setEditValue("title", category.title);
    setEditValue("prefix", category.prefix);
    setEditValue("img", category.img);
  };

  // Handle Edit Submit
  const handleEditSubmit = (category: TCategory) => {
    return handleSubmitEdit((data) => {
      dispatch(
        actUpdateCategory({
          ...category,
          ...data,
        })
      );
    });
  };

  // Handle Delete Confirm
  const handleConfirmDelete = (category: TCategory) => {
    dispatch(actDeleteCategory(Number(category.id)));
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
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
                <tr key={categoty.id} className="transition-colors duration-150 hover:bg-gray-50/60">
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
                      {/* Edit Modal */}
                      <span onClick={() => handleOpenEdit(categoty)}>
                        <Modal title="Edit" confirmBtnTxt="Save Changes"onConfirm={handleEditSubmit(categoty)}>
                          <div className="space-y-4">
                            <Input  label="Category Title"  name="title"  placeholder="Enter category title"  register={registerEdit}  error={editErrors?.title?.message} />
                            <Input label="Category Prefix" name="prefix" placeholder="Enter category prefix" register={registerEdit} error={editErrors?.prefix?.message} />
                            <Input label="Image URL" name="img" type="url" placeholder="Enter image URL" register={registerEdit} error={editErrors?.img?.message} />
                          </div>
                        </Modal>
                      </span>

                      {/* Delete Modal */}
                      <Modal title="Delete" confirmBtnTxt="Delete" onConfirm={() => handleConfirmDelete(categoty)}>
                        <p className="text-xs text-gray-500 text-center py-2">
                          Are you sure you want to delete{" "}
                          <span className="font-semibold text-gray-800">
                            "{categoty.title}"
                          </span>
                          ? This action cannot be undone.
                        </p>
                      </Modal>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-12 text-center text-sm text-gray-500">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="font-medium text-gray-700">No Categories found</span>
                    <span className="text-xs text-gray-400">Try adding some Categories to display here.</span>
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
