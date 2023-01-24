import { collection, onSnapshot, query } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { firestore } from '../firebase-config';
import { setAuthors, setLoading, setPictures } from '../redux/PicturesSlice';
import { Picture } from '../types';

const storage = getStorage();

const useLoadPictures = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const downloadImages = async () => {
      try {
        dispatch(setLoading({ loading: true }));

        onSnapshot(query(collection(firestore, 'authors')), (authors) => {
          authors.forEach((author) => {
            const name = author.data().name as string;
            dispatch(setAuthors({ author: name }));
          });
        });

        onSnapshot(query(collection(firestore, 'pictures')), (pictures) => {
          pictures.forEach(async (picture) => {
            const curPicture = picture.data() as Picture;

            const pictureRef = ref(storage, `pictures/${curPicture.nameId}`);

            const pictureURL = await getDownloadURL(pictureRef);

            curPicture.url = pictureURL;

            dispatch(setPictures({ picture: curPicture }));

            dispatch(setLoading({ loading: false }));
          });
        });
      } catch (error) {
        toast.error((error as Error).message);

        dispatch(setLoading({ loading: false }));
      }
    };

    downloadImages();
  }, []);
};

export default useLoadPictures;
