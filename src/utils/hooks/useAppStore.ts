import React from 'react'
import { useStore } from 'react-redux'
import { RootState } from '../../store'

const useAppStore = () => {
    const store = useStore<RootState>()
    return store;
}

export default useAppStore