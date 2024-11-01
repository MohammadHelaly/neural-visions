import { UseMutationOptions } from "@tanstack/react-query";

type MutationOptionsWithoutFn<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

export type { MutationOptionsWithoutFn };
