// 'use server'
import {db} from '../firebase/config'
import { addDoc, collection, doc, getDocs } from "firebase/firestore"


async function addDataToFireStore(title, text, tags, author_name, upvotes, downvotes) {
    try{
        const docRef = await addDoc(collection(db, 'posts'), {
            title: title,
            text: text,
            tags: tags,
            author_name: author_name,
            upvotes : upvotes,
            downvotes : downvotes
        })
        console.log("Document written with ID: ", docRef.id)
        return true
    } catch(e) {
        console.error("Error adding document: ", e)
        return false
    }
}

async function addCommentToFireStore( text, pid, author_name, upvotes, downvotes) {
    try{
        const docRef = await addDoc(collection(db, 'comments'), {
            text: text,
            post_id: pid,
            author_name: author_name,
            upvotes : upvotes,
            downvotes : downvotes
        })
        console.log("Comment written with ID: ", docRef.id)
        return true
    } catch(e) {
        console.error("Error adding comment: ", e)
        return false
    }
}

// async function fetchDataFromFireStore() {
//     const querySnapshot = await getDocs(collection(db, 'posts'))
//     const data = [];
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`)
//         data.push({
//             id: doc.id,
//             ...doc.data()
//         });
//     })
//     return data;
// }

const fetchDataFromFireStore = async () => {

    const collectionRef = collection(db, 'posts')
    const querySnapshot = await getDocs(collectionRef)
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  }

//   const 
export {addCommentToFireStore, addDataToFireStore, fetchDataFromFireStore }