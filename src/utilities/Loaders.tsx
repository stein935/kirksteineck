import { Timestamp } from "firebase/firestore";
import firebase from "./Firebase";

export interface Page {
  [key: string]: unknown;
  bg_pattern: string;
  color_1: string;
  color_2: string;
  content: Content[];
  heading: string;
  nav: Nav[];
  sub_heading: string;
  title: string;
  updated_at: Timestamp;
}

export interface Content {
  text: string;
  type: string;
  col: number;
}

export interface Nav {
  action: string;
  cta: string;
  icon: string;
  sub_title: string;
  title: string;
}

export interface PageLoaderProps {
  coll: string;
  id?: string;
}

export interface PagesLoaderProps {
  coll: string;
}

class Loaders {
  pageLoader = async ({ coll, id }: PageLoaderProps, callback = () => {}) => {
    if (!id) {
      return console.log(id + ": Page not found");
    }
    const doc = await firebase.getDoc<Page>(coll, id);
    callback;
    return doc;
  };
  pagesLoader = async ({ coll }: PagesLoaderProps) => {
    const docs = await firebase.getAllDocs(coll);
    return docs;
  };
}
const loaders = new Loaders();
export default loaders;
