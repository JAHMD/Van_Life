import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Suspense, useState } from "react";
import {
	Await,
	Link,
	defer,
	useLoaderData,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../components/Loader";
import Modal from "../../components/Modal";
import { auth, db, getVan } from "../../utils/api";

function VanDetails() {
	const location = useLocation();
	const search = `?${location.state?.search}` || "";
	const vansType = location.state?.type || "all";
	const data = useLoaderData();
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	async function rentVan({ van }) {
		const userId = auth?.currentUser?.uid;
		if (userId === undefined) {
			return navigate("/login?message=You should be logged in!");
		}
		const docRef = doc(db, "users", userId);
		const snap = await getDoc(docRef);
		if (!snap.exists()) {
			return await createHostDoc({ userId, van });
		}
		return await updateHostDoc({ docRef, snap, van });
	}

	async function createHostDoc({ userId, van }) {
		await setDoc(doc(db, "users", userId), { vans: [van] });
		return notify();
	}

	async function updateHostDoc({ docRef, snap, van }) {
		const hostedVansList = snap.data().vans;
		for (let vanItem of hostedVansList) {
			if (van.id === vanItem.id) {
				return setIsModalOpen(true);
			}
		}
		const updatedVansList = [...hostedVansList, van];
		await updateDoc(docRef, { vans: updatedVansList });
		return notify();
	}

	function notify({
		type = "success",
		message = "Van rented successfully.",
	} = {}) {
		toast[type](message, {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
		setTimeout(() => {
			navigate("/vans");
		}, 2500);
	}

	return (
		<>
			{isModalOpen ? <Modal closeModal={() => setIsModalOpen(false)} /> : null}
			<ToastContainer />
			<section className="van-detail-container">
				<Link to={`..${search}`} state="" className="back-button">
					&larr;<span>Back to {vansType} vans</span>
				</Link>
				<Suspense fallback={<Loader />}>
					<Await resolve={data.van}>
						{(van) => {
							return (
								<div className="van-detail">
									<img src={van.imageUrl} loading="lazy" />
									<div className="container">
										<span className={`van-type ${van.type} selected`}>
											{van.type}
										</span>
										<h2>{van.name}</h2>
										<p className="van-price">
											<span>${van.price}</span>/day
										</p>
										<p>{van.description}</p>
										<button
											className="link-button"
											onClick={async () => await rentVan({ van })}
										>
											Rent this van
										</button>
									</div>
								</div>
							);
						}}
					</Await>
				</Suspense>
			</section>
		</>
	);
}

export function vanDetailsLoader({ params }) {
	const { id } = params;
	const van = getVan(id);
	return defer({ van });
}

export default VanDetails;
