import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: ({token}) => {
                    return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Verify your email </a>`
            }


        }

    } ,
    access: {
      read: () => true,
      create: () => true,  
    },
   
    fields: [
        {
            name: "role",
            required: true,
            defaultValue: "user",
            // admin:{
            //     condition: () => false
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