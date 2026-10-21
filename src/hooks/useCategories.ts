import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetCategories } from "../store/categories/atc/getCategories";
import { useEffect } from "react";
import { cleanUpCategoriesRecords } from "@store/categories/categoriesSlice";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
    return () => {
      dispatch(cleanUpCategoriesRecords());
    };
  }, [dispatch]);
  return {loading,error,records};
};

export default useCategories;
