import ProductReel from "@/components/ProductReel"
import Wrapper from "@/components/Wrapper"
import { PROD_CATEGORIES } from "@/config"

type Param = string | string[] | undefined

interface ProductsPage {
    searchParams: {[key: string]: Param}
}

const parse = (param: Param) => {
    return typeof param === 'string' ? param : undefined
}

const Products = ({searchParams}: ProductsPage) => {
    const sort = parse(searchParams.sort)
    const category = parse(searchParams.category)
    const label = PROD_CATEGORIES.find(({value}) => value === category)?.label
  return (
   
    <Wrapper>
        <ProductReel title={label ?? 'All Products'}  query={{category,limit:40, sort: sort === 'desc' || sort === 'asc' ? sort : undefined}} />
    </Wrapper>
  )
}

export default Products