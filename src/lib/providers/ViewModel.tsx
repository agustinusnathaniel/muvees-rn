import React from 'react'

type ViewModelValue<T> = T

const ViewModelContext = React.createContext<ViewModelValue<unknown> | undefined>(
  undefined
)

export const useViewModelContext = <T extends Object>() => {
  const viewModelContextValue = React.useContext(ViewModelContext)

  if (!viewModelContextValue) {
    throw new Error('useViewModelContext must be used within ViewModelProvider')
  }

  return viewModelContextValue as T
}

export const ViewModelProvider = <T extends Object>({
  children,
  ...props
}: React.PropsWithChildren<T>) => {
  return <ViewModelContext.Provider value={props}>{children}</ViewModelContext.Provider>
}
