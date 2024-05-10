import firebase from "./Firebase";

export interface Page {
  bg_pattern: string;
  color_1: string;
  color_2: string;
  content: {
    text: string;
    type: string;
    col: number;
  }[];
  heading: string;
  nav: {
    action: string;
    cta: string;
    icon: string;
    sub_title: string;
    title: string;
  }[];
  sub_heading: string;
  title: string;
}

export interface PageLoaderProps {
  coll: string;
  id: string;
}

class Loaders {
  pageLoader = async ({ coll, id }: PageLoaderProps) => {
    const doc = await firebase.getDoc<Page>(coll, id);
    return doc;
  };
}
const loaders = new Loaders();
export default loaders;
