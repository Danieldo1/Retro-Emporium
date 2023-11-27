"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROD_CATEGORIES = void 0;
exports.PROD_CATEGORIES = [
    {
        label: 'Pixel Art',
        value: 'art',
        featured: [
            {
                name: 'Art and Prints',
                href: '/products?category=art',
                imageSrc: '/nav/pixel/bg.png',
            },
        ]
    },
    {
        label: 'NFT ',
        value: 'nft',
        featured: [
            {
                name: 'NFT Collections',
                href: '/products?category=nft',
                imageSrc: '/nav/nft/bg.png',
            },
        ]
    },
    {
        label: 'Fonts ',
        value: 'fonts',
        featured: [
            {
                name: 'Retro Fonts',
                href: '/products?category=fonts',
                imageSrc: '/nav/fonts/bg.png',
            },
        ]
    },
];
var categoryName = exports.PROD_CATEGORIES[0].featured[0].name;
