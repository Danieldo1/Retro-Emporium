import { PROD_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";


export const Products:CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {
        // create: () => true,
        // read: () => true,
        // update: () => true,
        // delete: () => true,
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: () => false,
            }
        },
        {
            name: 'images',
            type: 'array',
            label: 'Product Images',
            minRows: 2,
            maxRows: 5,
            required: true,
            labels: {
                singular: 'product image',
                plural: 'product images'
            },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true
                }
            ]
        },
        {
            name: "name",
            label: "What are you selling ?",
            type: "text",
            required: true,
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: PROD_CATEGORIES.map(({label, value}) => ({label, value})),
            required: true,
        },
        {
            name: "description",
            label: "Description of your product",
            type: "textarea",
            required: true,
        },
        {
            name: "price",
            label: "Price (€)" ,
            type: "number",
            required: true,
            min: 0,
            max: 10000,
        },
        {
            name: "product_files",
            label: "Product File(s)",
            type: 'relationship',
            required: true,
            relationTo: "product_files",
            hasMany: false,
        },
        {
            name: "approvedForSale",
            label: "Product Status",
            type: "select",
            defaultValue: 'pending',
            access: {
              create: ({req}) => req.user.role === 'admin',  
              read: ({req}) => req.user.role === 'admin',  
              update: ({req}) => req.user.role === 'admin',  
            },
            options: [
                {
                    label: 'Pending Approval',
                    value: 'pending'
                },
                {
                    label: 'Approved For Sale',
                    value: 'approved'
                },
                {
                    label: 'Rejected',
                    value: 'rejected'
                }
            ]
        },
        {
            name: 'priceId',
            access: {
                create: ()=>false,
                read: ()=>false,
                update: ()=>false,
                
            },
            type: 'text',
            admin: {
                hidden: true
            }
        },
        {
            name: 'stripeId',
            access: {
                create: ()=>false,
                read: ()=>false,
                update: ()=>false,
                
            },
            type: 'text',
            admin: {
                hidden: true
            }
        },
        
        ]
}