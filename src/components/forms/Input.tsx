import { Form } from "react-bootstrap";
import type { Path, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  error?: string;
  placeholder: string;
  styles?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // onChange is better than this.(i think)
  afterOnBlurOperationSuccessOrFailed?: React.ReactNode;
};
const Input = <TFieldValue extends FieldValues>({
  type = "text",
  register,
  name,
  error,
  placeholder,
  label,
  styles,
  onBlur,
  afterOnBlurOperationSuccessOrFailed,
}: InputProps<TFieldValue>) => {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(e);
    register(name).onBlur(e);
  };
  return (
    <Form.Group className={`${styles}`}>
      <Form.Label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
        {label}
      </Form.Label>
      <div className="flex gap-3">
        <Form.Control
          placeholder={placeholder}
          type={type}
          className="rounded-lg bg-gray-50 border-gray-200 py-2.5 px-3.5 text-sm focus:border-rose-600 focus:ring-1 focus:ring-rose-600 shadow-none"
          {...register(name)}
          onBlur={onBlurHandler}
          isInvalid={!!error}
        />
        {afterOnBlurOperationSuccessOrFailed && (
          <Form.Text muted>{afterOnBlurOperationSuccessOrFailed}</Form.Text>
        )}
      </div>
      {error && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default Input;
