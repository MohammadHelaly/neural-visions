import {
  MutationOptionsWithoutFn,
  PredictionResponse,
} from "@/api/services/types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "@/api/client/axios";

const useSubmitVQnAForm = (
  options?: MutationOptionsWithoutFn<PredictionResponse, unknown, FormData>,
): UseMutationResult<PredictionResponse, unknown, FormData> => {
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
