import type { AppDispatch, AppStore } from "app/store"
import { useDispatch, type TypedUseSelectorHook, useSelector } from "react-redux"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector
