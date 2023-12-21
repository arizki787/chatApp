import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: () => true,
  },
  fields: [
    {
      name: "username",
      type: "text",
      required: true,
    },
  ],
};

export default Users;
