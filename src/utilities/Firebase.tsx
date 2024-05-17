import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Auth,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import {
  CollectionReference,
  DocumentData,
  Firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  getDoc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { doc, getDocs, collection } from "firebase/firestore";

const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};
class Firebase {
  private firebase: FirebaseApp;

  private firestore: Firestore;

  public googleProvider: GoogleAuthProvider;

  public auth: Auth;

  constructor() {
    this.firebase = initializeApp(config);
    this.firestore = getFirestore(this.firebase);
    this.googleProvider = new GoogleAuthProvider();
    this.auth = getAuth(this.firebase);
  }

  signInWithGoogle = async () => {
    try {
      await signInWithPopup(this.auth, this.googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  googleLogout = () => {
    this.auth.signOut();
  };

  createFirestoreDataConverter = <
    T extends DocumentData,
  >(): FirestoreDataConverter<T> => {
    return {
      toFirestore(data: T): DocumentData {
        return data;
      },
      fromFirestore(snapshot: QueryDocumentSnapshot<T>): T {
        return snapshot.data();
      },
    };
  };

  createDocRef = <T extends DocumentData>(
    db: Firestore,
    coll: string,
    id: string,
  ) => {
    if (!coll) {
      return doc(db, coll).withConverter(
        this.createFirestoreDataConverter<T>(),
      );
    }
    return doc(db, coll, id).withConverter(
      this.createFirestoreDataConverter<T>(),
    );
  };

  createCollRef = <T extends DocumentData>(
    db: Firestore,
    coll: string,
  ): CollectionReference<T> => {
    return collection(db, coll).withConverter(
      this.createFirestoreDataConverter<T>(),
    );
  };

  getDoc = async <T extends DocumentData>(
    coll: string,
    id: string,
  ): Promise<T | null> => {
    const ref = this.createDocRef<T>(this.firestore, coll, id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
      return null;
    }
    const data = { ...snapshot.data() };
    if (!data) return null;
    return data;
  };

  getAllDocs = async <T extends DocumentData>(
    coll: string,
  ): Promise<T[] | null> => {
    const collRef = this.createCollRef<T>(this.firestore, coll);
    const snapshot = await getDocs(collRef);
    if (snapshot.empty) {
      return null;
    }
    const data = snapshot.docs.map((doc) => {
      return doc.data();
    });
    return data;
  };

  updateDocData = async <T extends DocumentData>(
    coll: string,
    data: object,
    id: string,
  ) => {
    try {
      const docRef = this.createDocRef<T>(this.firestore, coll, id);
      await updateDoc(docRef, { ...data, updated_at: serverTimestamp() });
      return true;
    } catch (error) {
      throw new Error(`Error updating document with ID ${id}: ${error}`);
    }
  };

  // deleteDocData = (coll: string, key: string | number, data: object) => {
  //   const task = async () => {
  //     const ref = doc(this.firestore, coll, key.toString());
  //     const del = await updateDoc(ref, data);
  //     return del;
  //   };
  //   return task();
  // };
}

const firebase = new Firebase();
export default firebase;
