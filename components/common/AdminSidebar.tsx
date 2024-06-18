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
        href: "/admin/ManagestateList",
        title: "Estate List",
      },
      {
        href: "/admin/flyerPromo",
        title: "Add Flyers & Promos",
      },
      {
        href: "/admin/flyerPromoList",
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
        href: "/admin/testmonials",
        title: "Add Testimonials",
      },
      {
        href: "/admin/testmonialList",
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
