import { Shirt,MonitorSmartphone,Dices, Home } from "lucide-react";


export const PROD_CATEGORIES = [
    {
        label: 'Pixel Art',
        value: 'art' as const,
        featured: [
            {
                name: 'Art and Prints',
                href:'/products?category=art',
                imageSrc: '/nav/pixel/bg.png',   
            },
        ]
    },
    {
        label: 'NFT ',
        value: 'nft' as const,
        featured: [
            {
                name: 'NFT Collections',
                href:'/products?category=nft',
                imageSrc: '/nav/nft/bg.png',
            },
           
        ]
    },
    {
        label: 'Fonts ',
        value: 'fonts' as const,
        featured: [
            {
                name: 'Retro Fonts',
                href:'/products?category=fonts',
                imageSrc: '/nav/fonts/bg.png',
            },
           
        ]
    },
]

const categoryName = PROD_CATEGORIES[0].featured[0].name;