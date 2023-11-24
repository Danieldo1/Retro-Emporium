import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
    slug: "users",
    auth: true,
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