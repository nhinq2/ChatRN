import {db} from '../services/FirebaseInit';
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
  Timestamp,
} from 'firebase/firestore';

function useService() {
  async function addMessage(data) {
    const docRef = await addDoc(collection(db, 'messages'), {
      name: data.name,
      image: data.image ?? null,
      message: data.message ?? null,
      thread_id: data.thread_id ?? null,
      read: false,
      created_at: Timestamp.fromMillis(data.created_at),
    });

    return docRef?.id;
  }

  async function getMessage(id) {
    const docSnap = await getDoc(doc(db, 'messages', id));
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return [];
  }

  async function updateMessage(data) {
    if (!data.id) {
      return;
    }
    const docRef = doc(db, 'messages', data.id);
    await updateDoc(docRef, data);
  }

  async function deleteMessage(id) {
    const docRef = doc(db, 'messages', id);
    if (docRef) {
      await deleteDoc(docRef);
    }
  }

  return {
    addMessage,
    getMessage,
    deleteMessage,
    updateMessage,
  };
}

export {useService};
