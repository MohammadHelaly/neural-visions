import { UseMutationOptions } from "@tanstack/react-query";

type MutationOptionsWithoutFn<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

interface PredictionResponseData {
  data: { answer: string; answer_type: string; answerability: string };
}

interface PredictionResponse {
  data: PredictionResponseData;
}

export type {
  MutationOptionsWithoutFn,
  PredictionResponseData,
  PredictionResponse,
};
