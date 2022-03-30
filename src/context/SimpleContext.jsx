import { createContext, useContext, useState } from 'react'

const defaultState = {
  data: {},
}
const SimpleContext = createContext(defaultState)

export const SimpleContextProvider = ({ children }) => {
  const [data, setData] = useState(defaultState)
  const updateState = (_data) => setData(_data)

  const contextValues = {
    data,
    updateState,
  }

  return <SimpleContext.Provider value={contextValues}>{children}</SimpleContext.Provider>
}

export const useSimpleContext = () => {
  const context = useContext(SimpleContext)
  if (context === undefined || context === null) {
    throw new Error(`useSimpleContext must be called within SimpleContextProvider`)
  }
  return context
}
