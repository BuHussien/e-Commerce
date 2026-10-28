import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DashboardCategoryTable from "@components/eCommerce/dashboard/DashboardCategoriesTable";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetCategories from "@store/categories/atc/actGetCategories";
import actAddCategory from "@store/categories/atc/actAddCategory";
import Input from "@components/forms/Input";
import Modal from "@components/common/Modal";

type CategoryFormValues = {
  title: string;
  prefix: string;
  img: string;
};

const AdminCategories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories,
  );

  // Form hooks for Add
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: addErrors },
  } = useForm<CategoryFormValues>();

  useEffect(() => {
    dispatch(actGetCategories());
  }, [dispatch]);

  // Add Handler
  const handleAddSubmit = handleSubmitAdd((data) => {
    dispatch(actAddCategory(data));
    resetAdd();
  });

  if (loading === "pending")
    return <p className="p-6 text-center text-gray-500">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Categories Management
          </h1>
          <p className="text-xs text-gray-500">
            Add, edit, or delete store categories
          </p>
        </div>
        <Modal title={"+ Add Category"} onConfirm={handleAddSubmit}>
          <Input label="Category Title" name="title" placeholder="Enter category title" register={registerAdd} error={addErrors.title?.message}/>
          <Input label="Category Prefix" name="prefix" placeholder="Enter category prefix" register={registerAdd} error={addErrors.prefix?.message}/>
          <Input label="Image URL" name="img" type="url" placeholder="Enter image URL" register={registerAdd} error={addErrors.img?.message}/>
        </Modal>
      </div>

      <DashboardCategoryTable categories={records} />
    </div>
  );
};

export default AdminCategories;
