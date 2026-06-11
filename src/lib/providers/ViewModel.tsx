import { createContext, use, type PropsWithChildren } from 'react';

type ViewModelValue<T> = T;

const ViewModelContext = createContext<ViewModelValue<unknown> | undefined>(
  undefined,
);

export const useViewModelContext = <T = unknown>() => {
  const viewModelContextValue = use(ViewModelContext);

  if (!viewModelContextValue) {
    throw new Error(
      'useViewModelContext must be used within ViewModelProvider',
    );
  }

  return viewModelContextValue as T;
};

export const ViewModelProvider = <T = unknown>({
  children,
  ...props
}: PropsWithChildren<T>) => {
  return (
    <ViewModelContext value={props}>{children}</ViewModelContext>
  );
};
