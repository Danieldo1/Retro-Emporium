"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROD_CATEGORIES = void 0;
var lucide_react_1 = require("lucide-react");
exports.PROD_CATEGORIES = [
    {
        label: 'Vintage',
        value: 'vintage_apparel',
        featured: [
            {
                name: 'Vintage Apparel',
                href: '#',
                imageSrc: '/nav/vintage/apparel.jpg',
                icon: lucide_react_1.Shirt
            },
            {
                name: 'Classic Electronics',
                href: '#',
                imageSrc: '/nav/vintage/electronics.jpg',
                icon: lucide_react_1.MonitorSmartphone
            },
            {
                name: 'Toys and Games',
                href: '#',
                imageSrc: '/nav/vintage/toys.jpg',
                icon: lucide_react_1.Dices
            },
            // {
            //     name: 'Home Decor',
            //     href:'#',
            //     imageSrc: '/nav/vintage/home.jpg',
            //     icon: Home
            // },
        ]
    },
    {
        label: 'Retro-Themed ',
        value: 'retro_themed ',
        featured: [
            {
                name: 'Art and Prints',
                href: '#',
                imageSrc: '/nav/retrothemed/posters.jpg',
            },
            {
                name: 'Books and Magazines',
                href: '#',
                imageSrc: '/nav/retrothemed/books1.jpg',
            },
            {
                name: 'Vinyls and Records',
                href: '#',
                imageSrc: '/nav/retrothemed/vinyls.jpg',
            },
        ]
    },
];
var categoryName = exports.PROD_CATEGORIES[0].featured[0].name;
