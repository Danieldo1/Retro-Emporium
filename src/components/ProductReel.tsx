import Link from "next/link"

interface ProductReelProps {
    title: string
    subtitle?: string
    href?: string

}

const ProductReel = (props: ProductReelProps) => {
    const {title, subtitle, href} = props
  return (
    <section className="py-12 ">
        <div className="md:flex md:items-center md:justify-between mb-4 ">
            <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
                {title ? <h1 className="text-3xl text2 font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>: null}
                {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>: null}
            </div>

            {href ? <Link href={href} className="hidden text-sm font-medium text-secondary hover:text-secondary/80 md:block">Shop the collection <span aria-hidden="true">&rarr;</span></Link>: null}
        </div>
    </section>
  )
}

export default ProductReel