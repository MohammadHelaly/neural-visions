import { UseMutationOptions } from "@tanstack/react-query";

type MutationOptionsWithoutFn<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

export type { MutationOptionsWithoutFn };
