import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "@store/hooks";

import actGetAllProducts from "@store/products/act/actGetAllProducts";
import actAddProduct from "@store/products/act/actAddProduct";
import actUpdateProduct from "@store/products/act/actUpdateProduct";
import actDeleteProduct from "@store/products/act/actDeleteProduct";

import type { TProduct } from "@customTypes/product";

import {
  addProductSchema,
  editProductSchema,
  type AddProductFormValues,
  type EditProductFormValues,
} from "@validation/productSchema";

const ITEMS_PER_PAGE = 5;

const INITIAL_ADD_VALUES: AddProductFormValues = {
  title: "",
  price: "",
  cat_prefix: "",
  img: "",
  description: "",
};

const INITIAL_EDIT_VALUES: EditProductFormValues = {
  title: "",
  price: "",
  description: "",
};

export const useAdminProducts = () => {
  const dispatch = useAppDispatch();

  const { loading, error, records, totalItems } = useAppSelector(
    (state) => state.products
  );

  // UI State
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editModalProduct, setEditModalProduct] =
    useState<TProduct | null>(null);
  const [deleteModalProduct, setDeleteModalProduct] =
    useState<TProduct | null>(null);

  // Add Form
  const addForm = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: INITIAL_ADD_VALUES,
    mode: "onTouched",
  });

  // Edit Form
  const editForm = useForm<EditProductFormValues>({
    resolver: zodResolver(editProductSchema),
    defaultValues: INITIAL_EDIT_VALUES,
    mode: "onTouched",
  });

  // Fetch Products
  useEffect(() => {
    dispatch(
      actGetAllProducts({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      })
    );
  }, [dispatch, currentPage]);

  const totalPages = Math.ceil(
    (totalItems ?? records.length) / ITEMS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // Add Product
  const handleAddSubmit = addForm.handleSubmit(async (data) => {
    try {
      await dispatch(actAddProduct(data)).unwrap();

      addForm.reset(INITIAL_ADD_VALUES);
      setIsAddModalOpen(false);

      dispatch(
        actGetAllProducts({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        })
      );
    } catch {

    }
  });

  // Open Edit Modal and Populate Form
  const handleOpenEdit = (product: TProduct) => {
    setEditModalProduct(product);

    editForm.reset({
      title: product.title,
      price: String(product.price),
      description: product.description ?? "",
    });
  };

  // Update Product
  const handleEditSubmit = editForm.handleSubmit(async (data) => {
    if (!editModalProduct) return;

    try {
      await dispatch(
        actUpdateProduct({
          ...editModalProduct,
          ...data,
        })
      ).unwrap();

      setEditModalProduct(null);
      editForm.reset(INITIAL_EDIT_VALUES);

      dispatch(
        actGetAllProducts({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        })
      );
    } catch {
      // Keep the edit modal open if the update fails.
    }
  });

  // Delete Product
  const handleConfirmDelete = async () => {
    if (!deleteModalProduct) return;

    try {
      await dispatch(
        actDeleteProduct(deleteModalProduct.id)
      ).unwrap();

      setDeleteModalProduct(null);

      dispatch(
        actGetAllProducts({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        })
      );
    } catch {
      // Keep the confirmation modal open if deletion fails.
    }
  };

  // Close Modals
  const handleCloseAdd = () => {
    setIsAddModalOpen(false);
    addForm.reset(INITIAL_ADD_VALUES);
  };

  const handleCloseEdit = () => {
    setEditModalProduct(null);
    editForm.reset(INITIAL_EDIT_VALUES);
  };

  return { loading, error, records, currentPage, totalPages, startIndex, itemsPerPage: ITEMS_PER_PAGE, totalItems,
    isAddModalOpen, editModalProduct, deleteModalProduct,
    forms: { add: addForm, edit: editForm},
    setters: { setCurrentPage, setIsAddModalOpen, setEditModalProduct, setDeleteModalProduct },
    handlers: { handleAddSubmit, handleOpenEdit, handleEditSubmit, handleConfirmDelete, handleCloseAdd, handleCloseEdit },
  };
};