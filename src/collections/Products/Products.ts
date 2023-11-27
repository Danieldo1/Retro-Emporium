import { AfterChangeHook, BeforeChangeHook } from "payload/dist/collections/config/types";
import { PROD_CATEGORIES } from "../../config";
import { Access, CollectionConfig } from "payload/types";
import { Product, User } from "../../payload-types";
import { stripe } from "../../lib/stripe";

const addUser:BeforeChangeHook<Product> = ({req, data}) => {
    const user = req.user

    return {
        ...data,
        user: user.id
    }
}

const syncUser: AfterChangeHook<Product> = async ({req, doc}) => {
    const fullUser = await req.payload.findByID({
        collection: 'users',
        id: req.user.id,
    })

    if(fullUser && typeof fullUser === 'object'){
        const {products} = fullUser
        const allIDs = [
            ...(products?.map(p => typeof p === 'object' ? p.id : p) || []),
        ]

        const createdProductIDs = allIDs.filter((id,i)=> allIDs.indexOf(id)===i)

        const dataUpdate = [...createdProductIDs, doc.id]

        await req.payload.update({
            collection: 'users',
            id: fullUser.id,
            data: {
                products: dataUpdate,
            },
        })
    }
}

const isYouOrAdmin = (): Access  => ({req: {user: _user}})=> {
    const user = _user as User | undefined

    if(!user) return false

    if(user.role === 'admin') return true

    const userProductsIDs = (user.products || []).reduce<Array<string>>((acc, p) => {
        if(!p) return acc
        if(typeof p ===  'string'){
            acc.push(p)
        } else {
            acc.push(p.id)
        }

        return acc
    },[])

    return {
        id: {
            in: userProductsIDs
    }
}
}

export const Products:CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {
    read: isYouOrAdmin(),
    update: isYouOrAdmin(),
    delete: isYouOrAdmin(),
    },
    hooks: {
        afterChange: [
            syncUser   
        ],
        beforeChange: [
            addUser,
            async (args) => {
                if(args.operation === 'create'){
                    const data = args.data as Product

                    const createdProd = await stripe.products.create({
                        name: data.name,
                        default_price_data:{
                            currency: 'EUR',
                            unit_amount: Math.round(data.price * 100),

                        }
                    })

                    const updated: Product = {
                        ...data,
                        stripeId: createdProd.id,
                        priceId: createdProd.default_price as string
                    }

                    return updated
                } else if(args.operation === 'update') {
                    const data = args.data as Product

                    const updatedProd = await stripe.products.update(
                        data.stripeId!,
                        {
                            name: data.name,
                            default_price: data.priceId!,

                        }
                    )

                    const updated: Product = {
                        ...data,
                        stripeId: updatedProd.id,
                        priceId: updatedProd.default_price as string
                    }

                    return updated
                }

            }
        ],


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
            minRows: 1,
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