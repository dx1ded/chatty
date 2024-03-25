import { useLazyQuery } from "@apollo/client"
import { SearchOutlined } from "@mui/icons-material"
import { Input } from "shared/ui/Input"
import { useDebouncedCallback } from "use-debounce"
import { FindUserQuery, FindUserQueryVariables } from "graphql/graphql"
import { useAppDispatch } from "shared/model"
import { setIsLoading, setResult } from "shared/slices/search"
import { FIND_USER } from "../model/user.queries"

export function Search() {
  const dispatch = useAppDispatch()
  const [findUsers, { data }] = useLazyQuery<FindUserQuery, FindUserQueryVariables>(FIND_USER)

  const debouncedSearch = useDebouncedCallback(async (value: string) => {
    if (!value) return dispatch(setResult([]))

    dispatch(setIsLoading(true))

    await findUsers({
      variables: { payload: value },
    })

    if (!data) return

    dispatch(setResult(data.findUser))
    dispatch(setIsLoading(false))
  }, 500)

  return (
    <div className="mb-6 px-5">
      <div className="relative">
        <SearchOutlined
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#CBCBCB]"
          sx={{ width: "1.3rem", height: "1.3rem" }}
        />
        <Input
          variant="secondary"
          placeholder="Search people"
          className="py-2 pl-9 pr-5 text-sm tracking-wide"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
    </div>
  )
}
