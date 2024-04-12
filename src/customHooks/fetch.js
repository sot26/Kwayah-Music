import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";

export const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, collectionName);
      const snapshot = await getDocs(collectionRef);
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setData(data);
    };

    fetchData();
  }, [collectionName]);

  return data;
};

export const useFetchDocument = (collectionName, docId) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData({ ...docSnap.data(), id: docSnap.id });
      } else {
        console.log("Document does not exist!");
      }
    };

    fetchDocument();
  }, [collectionName, docId]);

  return data;
};
