import { AppDispatch, RootState } from '@/state'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector