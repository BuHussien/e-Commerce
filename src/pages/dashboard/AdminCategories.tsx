import { useState, useEffect } from "react";
import DashboardCategoryTable from "@components/eCommerce/dashboard/DashboardCategoriesTable";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetCategories from "@store/categories/atc/actGetCategories";
import actAddCategory from "@store/categories/atc/actAddCategory";
import actUpdateCategory from "@store/categories/atc/actUpdateCategory";
import actDeleteCategory from "@store/categories/atc/actDeleteCategory";
import type { TCategory } from "@customTypes/category";

const AdminCategories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.categories);

  // Modals States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editModalCategory, setEditModalCategory] = useState<TCategory | null>(null);
  const [deleteModalCategory, setDeleteModalCategory] = useState<TCategory | null>(null);

  // Form States for Add
  const [newTitle, setNewTitle] = useState("");
  const [newPrefix, setNewPrefix] = useState("");
  const [newImg, setNewImg] = useState("");

  // Form States for Edit
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPrefix, setEditedPrefix] = useState("");
  const [editedImg, setEditedImg] = useState("");

  useEffect(() => {
    dispatch(actGetCategories());
  }, [dispatch]);

  // Add Handlers
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      actAddCategory({
        title: newTitle,
        prefix: newPrefix,
        img: newImg,
      })
    );
    setIsAddModalOpen(false);
    setNewTitle("");
    setNewPrefix("");
    setNewImg("");
  };

  // Edit Handlers
  const handleOpenEdit = (category: TCategory) => {
    setEditModalCategory(category);
    setEditedTitle(category.title);
    setEditedPrefix(category.prefix);
    setEditedImg(category.img);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalCategory) return;

    dispatch(
      actUpdateCategory({
        ...editModalCategory,
        title: editedTitle,
        prefix: editedPrefix,
        img: editedImg,
      })
    );
    setEditModalCategory(null);
  };

  // Delete Handlers
  const handleOpenDelete = (category: TCategory) => {
    setDeleteModalCategory(category);
  };

  const handleConfirmDelete = () => {
    if (!deleteModalCategory) return;
    dispatch(actDeleteCategory(Number(deleteModalCategory.id)));
    setDeleteModalCategory(null);
  };

  if (loading === "pending") return <p className="p-6 text-center text-gray-500">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-xs text-gray-500">Add, edit, or delete store categories</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-xl bg-pink-600 px-4 py-2 text-xs font-semibold text-white hover:bg-pink-700 transition-colors shadow-sm"
        >
          + Add Category
        </button>
      </div>

      <DashboardCategoryTable
        categories={records}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {/* --- Add Category Modal --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add New Category</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Category Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Category Prefix
                </label>
                <input
                  type="text"
                  value={newPrefix}
                  onChange={(e) => setNewPrefix(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={newImg}
                  onChange={(e) => setNewImg(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-pink-600 px-4 py-2 text-xs font-semibold text-white hover:bg-pink-700 transition-colors shadow-sm"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Edit Modal --- */}
      {editModalCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <h3 className="text-lg font-bold text-gray-900">Edit Category</h3>
              <button
                onClick={() => setEditModalCategory(null)}
                className="text-gray-400 hover:text-gray-600 font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Category Title
                </label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Category Prefix
                </label>
                <input
                  type="text"
                  value={editedPrefix}
                  onChange={(e) => setEditedPrefix(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={editedImg}
                  onChange={(e) => setEditedImg(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditModalCategory(null)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-pink-600 px-4 py-2 text-xs font-semibold text-white hover:bg-pink-700 transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Delete Confirmation Modal --- */}
      {deleteModalCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-gray-100 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4 font-bold text-lg">
              !
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Delete Category
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                "{deleteModalCategory.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalCategory(null)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-full rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
