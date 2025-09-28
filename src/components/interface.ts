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
  showHome?: string;
}
