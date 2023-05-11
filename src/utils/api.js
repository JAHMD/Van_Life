import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { redirect } from "react-router-dom";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: "vanlife-813c9.firebaseapp.com",
	projectId: "vanlife-813c9",
	storageBucket: "vanlife-813c9.appspot.com",
	messagingSenderId: "966084436758",
	appId: "1:966084436758:web:e81d02d0ac86e06429e637",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

const vansCollection = collection(db, "vans");

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

export async function rentVan({ userId, van }) {
	console.log("from rent van", userId);
	const docRef = doc(db, "users", userId);
	const snap = await getDoc(docRef);
	const hostedVansList = await snap.data().vans;
	console.log(hostedVansList);
	for (let vanItem of hostedVansList) {
		if (van.id === vanItem.id) {
			return redirect("/vans");
		}
	}
	const updatedVansList = [...hostedVansList, van];
	await updateDoc(docRef, { vans: updatedVansList });
	return redirect("/vans");
}
