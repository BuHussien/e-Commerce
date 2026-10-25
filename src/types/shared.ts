export type TLoading = "idle" | "pending" | "succeeded" | "failed";

export interface AddressFormData {
  country: string;
  government: string;
  city: string;
  detailedAddress: string;
}

export interface SecurityFormData {
  firstname: string;
  lastname: string;
  password?: string;
  confirmPassword?: string;
}

export type ActiveModal = "security" | "address" | null;