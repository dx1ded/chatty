import { useLazyQuery } from "@apollo/client"
import { SearchOutlined, CancelOutlined } from "@mui/icons-material"
import { Input } from "shared/ui/Input"
import { useDebouncedCallback } from "use-debounce"
import { FindUserQuery, FindUserQueryVariables } from "__generated__/graphql"
import { useAppDispatch, useAppSelector } from "shared/model"
import { setIsLoading, setSearchItems } from "shared/slices/search"
import { forwardRef, useImperativeHandle, useRef } from "react"
import { FIND_USER } from "../model/user.queries"

export const Search = forwardRef<HTMLInputElement>(function Search(_, ref) {
  const dispatch = useAppDispatch()
  const { items, isLoading } = useAppSelector((state) => state.search)
  const [findUsers, { loading }] = useLazyQuery<FindUserQuery, FindUserQueryVariables>(FIND_USER)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const debouncedSearch = useDebouncedCallback(async (value: string) => {
    if (!value) return dispatch(setSearchItems(null))

    dispatch(setIsLoading(true))

    const query = await findUsers({
      variables: { payload: value },
    })
    const data = query.data?.findUser

    dispatch(setIsLoading(false))
    if (!data) return
    dispatch(setSearchItems(data))
  }, 500)

  const clearSearch = () => {
    inputRef.current!.value = ""
    dispatch(setSearchItems(null))
  }

  // Updating outer ref
  useImperativeHandle(ref, () => inputRef.current!, [])

  return (
    <div className="mb-6 px-5">
      <div className="relative">
        <SearchOutlined
          className="pointer-events-none absolute left-2.5 top-1/2 z-10 -translate-y-1/2 text-[#CBCBCB]"
          sx={{ width: "1.3rem", height: "1.3rem" }}
        />
        <Input
          ref={inputRef}
          isLoading={loading}
          variant="secondary"
          placeholder="Search people"
          className="py-2 pl-9 pr-5 text-sm tracking-wide"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        {items && !isLoading && (
          <button
            type="button"
            className="absolute right-4 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center text-[#CBCBCB]"
            onClick={clearSearch}>
            <CancelOutlined sx={{ width: "100%", height: "100%" }} />
          </button>
        )}
      </div>
    </div>
  )
})
