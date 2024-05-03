import { LucideIcon } from 'lucide-react'

interface CategoryCardProps {
    category:string;
    description:string;
    link: string
    Icon: LucideIcon
}

const CategoryCard:React.FC<CategoryCardProps> = ({category,description,link,Icon}) => {
  return (
    <div className="max-w-[400px] text-wrap flex flex-col border-[1px] p-4 rounded-lg border-black gap-y-4">
    <div className="flex items-center justify-between font-bold text-lg">
       <h2>{category}</h2>
       <Icon/>
    </div>
    <p className="break-words">{description}</p>
    <p>{link}</p>
   </div>
  )
}

export default CategoryCard