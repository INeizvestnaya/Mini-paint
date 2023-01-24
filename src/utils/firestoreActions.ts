import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

import { firestore } from '../firebase-config';

export const addPicture = async (
  name: string,
  nameId: string,
  author: string | null | undefined
) => {
  await addDoc(collection(firestore, 'pictures'), {
    name,
    nameId,
    author
  });
};

export const addAuthor = async (user: string | null | undefined) => {
  await setDoc(
    doc(firestore, `authors/${user}`),
    { name: user },
    { merge: true }
  );
};
