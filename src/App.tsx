import "@fontsource/ubuntu";
import "@fontsource/ubuntu-mono";
import "@fontsource/merriweather";
import "@fontsource/alfa-slab-one";
import "./App.css";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyDSA25vkFkmdS7y_7pB8sx9h7RlN18O48E",
  authDomain: "kirk-steineck.firebaseapp.com",
  projectId: "kirk-steineck",
  storageBucket: "kirk-steineck.appspot.com",
  messagingSenderId: "534268045988",
  appId: "1:534268045988:web:0a0c206c29f2be80c89431",
  measurementId: "G-9S4JN1MJP7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const addUser = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getUser = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};

function App() {
  return (
    <>
      <div className="prose prose-stone prose-md container mx-4 space-y-4 font-serif antialiased">
        <div className="pt-4">
          <h1 className="font-display mb-0">Kirk Steineck</h1>
          <p className="mt-0">stein935@gmail.com</p>
          <button onClick={addUser}>Add</button>
          <button onClick={getUser}>Get</button>
        </div>
      </div>
    </>
  );
}

export default App;
