import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	where,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: "vanlife-813c9.firebaseapp.com",
	projectId: "vanlife-813c9",
	storageBucket: "vanlife-813c9.appspot.com",
	messagingSenderId: "966084436758",
	appId: "1:966084436758:web:e81d02d0ac86e06429e637",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export const auth = getAuth(app);

const vansCollection = collection(db, "vans");
const hostedVansCollection = collection(db, "users");

export async function getVans() {
	const snapshot = await getDocs(vansCollection);
	const vansArr = snapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
	return vansArr;
}

export async function getVan(id) {
	const docRef = doc(db, "vans", id);
	const vanSnap = await getDoc(docRef);
	return { ...vanSnap.data(), id: vanSnap.id };
}

export async function getHostVans(id) {
	const docRef = doc(db, "users", id);
	const vansSnap = await getDoc(docRef);
	return { ...vansSnap.data(), id: vansSnap.id };
}
// export async function getHostVans() {
// 	const q = query(vansCollection, where("hostId", "==", "123"));
// 	const snapshot = await getDocs(q);
// 	const vansArr = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
// 	return vansArr;
// }
