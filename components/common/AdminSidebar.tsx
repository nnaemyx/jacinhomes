interface menuItems {
  href?: string;
  title: string;
  subItems?: menuItems[];
}

const menuItems = [
  {
    href: "/admin",
    title: "Dashboard",
  },
  {
    title: "Catalog",
    subItems: [
      {
        href: "/admin/estate",
        title: "Add Estate",
      },
      {
        href: "/admin/catalog/Procedurelist",
        title: "Estate List",
      },
      {
        href: "/admin/catalog/Productlist",
        title: "Add Flyers & Promos",
      },
      {
        href: "/admin/catalog/Procedurelist",
        title: "Flyers & Promos List",
      },
      {
        href: "/admin/catalog/Category",
        title: "Add images",
      },
      {
        href: "/admin/catalog/Procedurelist",
        title: "Images List",
      },
      {
        href: "/admin/catalog/Categorylist",
        title: "Add Videos",
      },
      {
        href: "/admin/catalog/Procedures",
        title: "Videos List",
      },
      {
        href: "/admin/catalog/Color",
        title: "Add Testimonials",
      },
      {
        href: "/admin/catalog/Colorlist",
        title: "Testimonial List",
      },
    ],
  },
  {
    title: "Blog",
    subItems: [
      {
        href: "/admin/create/Createorder",
        title: "Create Blogr",
      },
      {
        href: "/admin/create/CreateIC",
        title: "Create IC",
      },
      {
        href: "/admin/create/CreateCustomer",
        title: "Create Customers",
      },
    ],
  },

  {
    href: "/admin/Reviews",
    title: "Reviews",
  },
];

export default menuItems;
