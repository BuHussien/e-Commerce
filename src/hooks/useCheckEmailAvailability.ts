import { useState } from "react";
import axiosInstance from "@services/axios-global";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";
const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] = useState<TStatus>("idle");
  const [formEmail, setFormEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setFormEmail(email);
    setEmailAvailabilityStatus("checking");
    try {
      const response = await axiosInstance.get(`/users?email=${email}`);
      if (!response.data.length) setEmailAvailabilityStatus("available");
      else setEmailAvailabilityStatus("notAvailable");
    } catch (error) {
      setEmailAvailabilityStatus("failed");
    }
  };

  const resetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setFormEmail(null);
  };

  return {
    emailAvailabilityStatus,
    enteredEmail: formEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  };
};
export default useCheckEmailAvailability;