export interface Category {
  title: string;
  slug: { current: string; _type: string };
}

export interface Post {
  mainImage: {
    _type: string;
    alt: string;
    asset: { _ref: string; _type: string };
  };
  categories: [];
  _createdAt: string;
  shortDescription: string;
  title: string;
  slug: { current: string; _type: string };
}

// export interface Body {
//   markDefs: [];
//   children: [[Object]];
//   _type: string;
//   style: string;
//   _key: string;
// }
