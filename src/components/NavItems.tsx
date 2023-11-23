'use client'

import { PROD_CATEGORIES } from "@/config"
import { useEffect, useRef, useState } from "react"
import NavItem from "./NavItem"
import { useOnClickOutside } from "@/hooks/useOutside"



const NavItems = () => {
const [active, setActive] = useState<null | number>(null)
const isAnyOpen = active !== null
const ref = useRef<HTMLDivElement | null>(null)

useOnClickOutside(ref, () => {
    setActive(null)
})

useEffect(() => {
   const handler =(event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        setActive(null)
    }
   }

   document.addEventListener('keydown', handler)

   return () => {
    document.removeEventListener('keydown', handler)
   }
},[])

  return (
    <div className="flex gap-4 h-full" ref={ref}>
        {PROD_CATEGORIES.map((category, index) => {
            const handleOpen = () => {
                if (active === index) {
                    setActive(null)
                } else {
                    setActive(index)
                }
            }

            const isOpen = active === index
            return (
                <NavItem key={category.value} category={category} handleOpen={handleOpen} isOpen={isOpen} isAnyOpen={isAnyOpen} />
            )
        })}
    </div>
  )
}

export default NavItems