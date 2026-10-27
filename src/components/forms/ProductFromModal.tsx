import type { BaseSyntheticEvent } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import Input from "@components/forms/Input";

interface ProductFormModalProps<T extends FieldValues> {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  form: UseFormReturn<T>;
  isEdit?: boolean;
}

type FieldName = "title" | "price" | "description" | "cat_prefix" | "img";

const ProductFormModal = <T extends FieldValues,>({ title, isOpen, onClose, onSubmit, form, isEdit = false}: ProductFormModalProps<T>) => {
  if (!isOpen) return null;
  const { isSubmitting, errors } = form.formState;
  const fields: Record<FieldName, Path<T>> = {
    title: "title" as Path<T>,
    price: "price" as Path<T>,
    description: "description" as Path<T>,
    cat_prefix: "cat_prefix" as Path<T>,
    img: "img" as Path<T>,
  };
  const fieldErrors = errors as unknown as Partial<Record<FieldName, { message?: string }>>;
  const inputClass ="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button type="button" onClick={onClose} className="font-semibold text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          {/* Title */}
          <Input label="Product Title" name={fields.title} register={form.register} error={fieldErrors.title?.message} placeholder="Enter product title"/>
          {/* Category */}
          {!isEdit && (<Input label="Category Prefix" name={fields.cat_prefix} register={form.register} error={fieldErrors.cat_prefix?.message} placeholder="Enter category prefix"/>)}
          {/* Price */}
          <Input label="Price ($)" type="number" name={fields.price} register={form.register} error={fieldErrors.price?.message} placeholder="Enter product price"/>
          {/* Description */}
          <div>
            <label htmlFor="product-description" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Description
            </label>
            <textarea id="product-description" rows={3} {...form.register(fields.description)} className={inputClass} aria-invalid={Boolean(fieldErrors.description)}/>
            {fieldErrors.description?.message && (<p role="alert" className="mt-1 text-xs text-red-500">{fieldErrors.description.message}</p>)}
          </div>

          {/* Image */}
          {!isEdit && (<Input label="Image URL (Optional)" type="url" name={fields.img} register={form.register} error={fieldErrors.img?.message} placeholder="https://example.com/image.jpg"/>)}
          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100">
              Cancel
            </button>

            <button type="submit" disabled={isSubmitting} className="rounded-xl bg-pink-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;