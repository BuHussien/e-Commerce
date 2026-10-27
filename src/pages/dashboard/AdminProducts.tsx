import DashboardProductTable from "@components/eCommerce/dashboard/DashboardProductTable";
import Paginator from "@components/common/Paginator";
import ProductFormModal from "@components/forms/ProductFromModal";
import DeleteConfirmationModal from "@components/forms/DeleteConfirmationModal";
import { useAdminProducts } from "@hooks/admin/useAdminProducts";

const AdminProducts = () => {
  const {
    loading,
    error,
    records,
    currentPage,
    totalPages,
    startIndex,
    itemsPerPage,
    totalItems,
    isAddModalOpen,
    editModalProduct,
    deleteModalProduct,
    forms,
    setters,
    handlers,
  } = useAdminProducts();

  if (loading === "pending" && !records.length)
    return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Products Management</h1>
          <p className="text-xs text-gray-500">
            Add, edit, or delete store products
          </p>
        </div>

        <button
          onClick={() => setters.setIsAddModalOpen(true)}
          className="rounded-xl bg-pink-600 px-4 py-2 text-white"
        >
          + Add Product
        </button>
      </header>

      {error && <p className="text-red-500">{error}</p>}

      <DashboardProductTable
        products={records}
        onEdit={handlers.handleOpenEdit}
        onDelete={setters.setDeleteModalProduct}
      />

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setters.setCurrentPage}
        startIndex={startIndex}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems || records.length}
      />

      <ProductFormModal
        title="Add New Product"
        isOpen={isAddModalOpen}
        onClose={handlers.handleCloseAdd}
        onSubmit={handlers.handleAddSubmit}
        form={forms.add}
      />

      <ProductFormModal
        title="Edit Product"
        isOpen={Boolean(editModalProduct)}
        onClose={handlers.handleCloseEdit}
        onSubmit={handlers.handleEditSubmit}
        form={forms.edit}
        isEdit
      />

      <DeleteConfirmationModal
        isOpen={Boolean(deleteModalProduct)}
        productTitle={deleteModalProduct?.title}
        onClose={() => setters.setDeleteModalProduct(null)}
        onConfirm={handlers.handleConfirmDelete}
      />
    </div>
  );
};

export default AdminProducts;