import React, { createContext, useContext } from 'react'

const LocContext = createContext();

export const useLocContext = () => {
    const context = useContext(LocContext);
}

const LocContext = () => {
  return (
    <div>LocContext</div>
  )
}

export default LocContext