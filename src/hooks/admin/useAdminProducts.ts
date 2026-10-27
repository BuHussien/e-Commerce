import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetAllProducts from "@store/products/act/actGetAllProducts";
import actAddProduct from "@store/products/act/actAddProduct";
import actUpdateProduct from "@store/products/act/actUpdateProduct";
import actDeleteProduct from "@store/products/act/actDeleteProduct";
import type { TProduct } from "@customTypes/product";

export const useAdminProducts = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records, totalItems } = useAppSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editModalProduct, setEditModalProduct] = useState<TProduct | null>(null);
  const [deleteModalProduct, setDeleteModalProduct] = useState<TProduct | null>(null);

  // Add Form State
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCatPrefix, setNewCatPrefix] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Edit Form State
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    dispatch(actGetAllProducts({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage]);

  const totalPages = Math.ceil((totalItems || records.length) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      actAddProduct({
        title: newTitle,
        price: newPrice,
        cat_prefix: newCatPrefix,
        img: newImg,
        description: newDescription,
      })
    ).then(() => {
      dispatch(actGetAllProducts({ page: currentPage, limit: itemsPerPage }));
    });

    setIsAddModalOpen(false);
    setNewTitle("");
    setNewPrice("");
    setNewCatPrefix("");
    setNewImg("");
    setNewDescription("");
  };

  const handleOpenEdit = (product: TProduct) => {
    setEditModalProduct(product);
    setEditedTitle(product.title);
    setEditedPrice(String(product.price));
    setEditedDescription(product.description || "");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalProduct) return;

    dispatch(
      actUpdateProduct({
        ...editModalProduct,
        title: editedTitle,
        price: editedPrice,
        description: editedDescription,
      })
    ).then(() => {
      dispatch(actGetAllProducts({ page: currentPage, limit: itemsPerPage }));
    });

    setEditModalProduct(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteModalProduct) return;
    dispatch(actDeleteProduct(deleteModalProduct.id)).then(() => {
      dispatch(actGetAllProducts({ page: currentPage, limit: itemsPerPage }));
    });
    setDeleteModalProduct(null);
  };

  return {
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
    formStates: {
      add: { newTitle, newPrice, newCatPrefix, newImg, newDescription },
      edit: { editedTitle, editedPrice, editedDescription },
    },
    setters: {
      setCurrentPage,
      setIsAddModalOpen,
      setEditModalProduct,
      setDeleteModalProduct,
      setNewTitle,
      setNewPrice,
      setNewCatPrefix,
      setNewImg,
      setNewDescription,
      setEditedTitle,
      setEditedPrice,
      setEditedDescription,
    },
    handlers: {
      handleAddSubmit,
      handleOpenEdit,
      handleEditSubmit,
      handleConfirmDelete,
    },
  };
};
