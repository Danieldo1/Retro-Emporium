import { Product } from '@/payload-types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type CartItem = {
    product: Product
}

type Cart = {
    items: CartItem[]
    addItem: (product: Product) => void
    removeItem: (productId: string) => void
    clearCart: () => void
}

export const useCart = create<Cart>()(
    persist(
        (set) => ({
            items: [],
            addItem: (product) => set((state) => ({ items: [...state.items, { product }] })),
            removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.product.id !== id) })),
            clearCart: () => set({ items: [] }),
        }), {
            name: 'cart',
            storage: createJSONStorage(() => localStorage),
        }
    )
) 