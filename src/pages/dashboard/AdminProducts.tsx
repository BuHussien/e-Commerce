import DashboardProductTable from "@components/eCommerce/dashboard/DashboardProductTable";
import Paginator from "@components/common/Paginator";
import { useAdminProducts } from "@hooks/admin/useAdminProducts";
import ProductFormModal from "@components/forms/ProductFromModal";
import DeleteConfirmationModal from "@components/forms/DeleteConfirmationModal";

const AdminProducts = () => {
  const { loading, error, records, currentPage, totalPages, startIndex, itemsPerPage, totalItems,
    isAddModalOpen, editModalProduct, deleteModalProduct, formStates, setters, handlers,
  } = useAdminProducts();

  if (loading === "pending") return <p className="p-6 text-center text-gray-500">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Products Management</h1>
          <p className="text-xs text-gray-500">Add, edit, or delete store products</p>
        </div>
        <button
          onClick={() => setters.setIsAddModalOpen(true)}
          className="rounded-xl bg-pink-600 px-4 py-2 text-xs font-semibold text-white hover:bg-pink-700 transition-colors shadow-sm"
        >
          + Add Product
        </button>
      </div>

      <DashboardProductTable
        products={records}
        onEdit={handlers.handleOpenEdit}
        onDelete={(prod) => setters.setDeleteModalProduct(prod)}
      />

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setters.setCurrentPage(page)}
        startIndex={startIndex}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems || records.length}
      />

      {/* Add Modal */}
      <ProductFormModal
        title="Add New Product"
        isOpen={isAddModalOpen}
        onClose={() => setters.setIsAddModalOpen(false)}
        onSubmit={handlers.handleAddSubmit}
        productTitle={formStates.add.newTitle}
        setProductTitle={setters.setNewTitle}
        categoryPrefix={formStates.add.newCatPrefix}
        setCategoryPrefix={setters.setNewCatPrefix}
        price={formStates.add.newPrice}
        setPrice={setters.setNewPrice}
        description={formStates.add.newDescription}
        setDescription={setters.setNewDescription}
        img={formStates.add.newImg}
        setImg={setters.setNewImg}
      />

      {/* Edit Modal */}
      <ProductFormModal
        title="Edit Product"
        isOpen={Boolean(editModalProduct)}
        onClose={() => setters.setEditModalProduct(null)}
        onSubmit={handlers.handleEditSubmit}
        productTitle={formStates.edit.editedTitle}
        setProductTitle={setters.setEditedTitle}
        price={formStates.edit.editedPrice}
        setPrice={setters.setEditedPrice}
        description={formStates.edit.editedDescription}
        setDescription={setters.setEditedDescription}
        isEdit
      />

      {/* Delete Modal */}
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
