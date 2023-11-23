import { Shirt,MonitorSmartphone,Dices, Home } from "lucide-react";


export const PROD_CATEGORIES = [
    {
        label: 'Vintage',
        value: 'vintage_apparel' as const,
        featured: [
            {
                name: 'Vintage Apparel',
                href:'#',
                imageSrc: '/nav/vintage/apparel.jpg',   
                icon: Shirt
            },
            {
                name: 'Classic Electronics',
                href:'#',
                imageSrc: '/nav/vintage/electronics.jpg',
                icon:MonitorSmartphone
            },
            {
                name: 'Toys and Games',
                href:'#',
                imageSrc: '/nav/vintage/toys.jpg',
                icon: Dices
            },
            {
                name: 'Home Decor',
                href:'#',
                imageSrc: '/nav/vintage/home.jpg',
                icon: Home
            },
        ]
    },
    {
        label: 'Retro-Themed ',
        value: 'retro_themed ' as const,
        featured: [
            {
                name: 'Art and Prints',
                href:'#',
                imageSrc: '/nav/retrothemed/posters.jpg',
            },
            {
                name: 'Books and Magazines',
                href:'#',
                imageSrc: '/nav/retrothemed/books1.jpg',
            },
            {
                name: 'Vinyls and Records',
                href:'#',
                imageSrc: '/nav/retrothemed/vinyls.jpg',
            },
           
        ]
    },
]