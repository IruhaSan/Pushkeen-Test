import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store'

const useAppSelector = <T = any>(callback: (state: RootState) => T) => {
    const selector = useSelector(callback)
    return selector;
}

export default useAppSelector