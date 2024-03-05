import { Category } from "../../types"

interface Props {
  categories: Category[]
}

export const BottomNavbar = ({ categories }: Props) => {
  return (
    <div className="px-6 py-1 flex gap-6 items-center bg-gray-100">
      {categories.map((cat) => (
        <div key={cat.id} className="w-24">{cat.name}</div>
      ))}
    </div>
  )
}
