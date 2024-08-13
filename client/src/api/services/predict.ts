import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "@/api/client/axios";
import { MutationOptionsWithoutFn } from "@/api/services/types";

const useSubmitVQnAForm = (
  options?: MutationOptionsWithoutFn<unknown, unknown, FormData>,
): UseMutationResult<unknown, unknown, FormData> => {
  return useMutation({
    mutationFn: async (formData: FormData) =>
      await api.post(
        import.meta.env.VITE_BACKEND_BASE_URL + "/predict",
        formData,
      ),
    ...options,
  });
};

export { useSubmitVQnAForm };
