import { SearchOutlined } from "@mui/icons-material"
import { Input } from "shared/ui/Input"

export function Search() {
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
        />
      </div>
    </div>
  )
}
