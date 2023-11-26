import { VerifyEmailHtml } from "../components/emails/VerifyEmail";
import { Access, CollectionConfig } from "payload/types";

const adminAndOwnerOnly: Access = ({ req: { user } }) => {
    if(user.role === "admin" ) return true
    return {
        id: {
            equals: user.id
        }
    }
}

export const Users: CollectionConfig = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: ({token}) => {
                return VerifyEmailHtml({
                    actionLabel: "Verify Email",
                    buttonText: "Verify Account",
                    href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
                })
            }


        }

    } ,
    access: {
      read: adminAndOwnerOnly,
      create: () => true,  
      update: ({req}) => req.user.role === 'admin',
      delete: ({req}) => req.user.role === 'admin',
    },
    admin: {
      hidden: ({user}) => user.role !== 'admin',
      defaultColumns: ['id'],

    },
   
    fields: [
        {
            name: 'products',
            label: 'Products',
            admin: {
                condition: () => false,
            },
            type: 'relationship',
            relationTo: 'products',
            hasMany: true
        },
        {
            name: 'product_files',
            label: 'Products Files',
            admin: {
                condition: () => false,
            },
            type: 'relationship',
            relationTo: 'product_files',
            hasMany: true
        },
        {
            name: "role",
            required: true,
            defaultValue: "user",
            // admin: {
            //     hidden: ({user}) => user.role !== 'admin', 
            // },
            type: "select",
            options: [
                {
                    value: "admin",
                    label: "Admin",
                },
                {
                    value: "user",
                    label: "User",
                }
            ],

        },

    ]
}