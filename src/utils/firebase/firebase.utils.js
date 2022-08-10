import {initializeApp} from 'firebase/app'
import {
   getAuth, 
   signInWithPopup, 
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged
   } from 'firebase/auth'

import {getFirestore, doc,getDoc, getDocs, setDoc, collection ,writeBatch, query} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAmVKKxW74XHwWuZVMFB8DQTkdPgNooHqA",
    authDomain: "crwn-clothing-db-ec73b.firebaseapp.com",
    projectId: "crwn-clothing-db-ec73b",
    storageBucket: "crwn-clothing-db-ec73b.appspot.com",
    messagingSenderId: "671723384591",
    appId: "1:671723384591:web:fdc9b9e6aeca85f97cd87a"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = ()=>signInWithPopup(auth,provider)


export const  db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  });

  await batch.commit()
  console.log('done')
}

export const getCategoriesAndDocuments = async()=>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
     const {title, items} = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
  },{})

  return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={})=>{
   if(!userAuth) return
  
  
   const userDocRef = doc(db,'users', userAuth.uid)

  console.log(userDocRef)

  const userSnapshot  = await getDoc(userDocRef)

  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  if(!userSnapshot.exists()){
    const {displayName , email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })

    }catch(error){
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email, password)=>{
  if(!email || !password)return;

 return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async(email, password)=>{
  if(!email || !password)return;

 return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async ()=> await signOut(auth)

export const onAuthStateChangedListener = (callback)=>onAuthStateChanged(auth, callback)