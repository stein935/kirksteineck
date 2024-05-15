import { FirebaseApp, initializeApp } from "firebase/app";
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
  apiKey: "AIzaSyDSA25vkFkmdS7y_7pB8sx9h7RlN18O48E",
  authDomain: "kirk-steineck.firebaseapp.com",
  projectId: "kirk-steineck",
  storageBucket: "kirk-steineck.appspot.com",
  messagingSenderId: "534268045988",
  appId: "1:534268045988:web:0a0c206c29f2be80c89431",
  measurementId: "G-9S4JN1MJP7",
};

/**
 * Firbase class with multiple firebase functions.
 *
 * @class Firebase
 */
class Firebase {
  /**
   * Firebase app.
   *
   * @private
   * @type {FirebaseApp}
   * @memberof Firebase
   */
  private firebase: FirebaseApp;

  /**
   * Firebase firestore.
   *
   * @private
   * @type {firebase.firestore.Firestore}
   * @memberof Firebase
   */
  private firestore: Firestore;

  /**
   * Creates an instance of Firebase.
   *
   * @memberof Firebase
   */
  constructor() {
    this.firebase = initializeApp(config);
    this.firestore = getFirestore(this.firebase);
  }

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

  /**
   * Gets page data
   *
   * @param {string} coll
   * @param {string} id
   * @memberof Firebase
   */
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

  deleteDocData = (coll: string, key: string | number, data: object) => {
    const task = async () => {
      const ref = doc(this.firestore, coll, key.toString());
      const del = await updateDoc(ref, data);
      return del;
    };
    return task();
  };
}

const firebase = new Firebase();
export default firebase;
