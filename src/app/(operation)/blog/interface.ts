export interface BlogData {
  _id?: string;
  date: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  serial?: number;
  type: string;
  metaDescription?: string;
  summery?: string;
  author_name?: string;
  author_description?: string;
  author_image?: string;
}