import { Suspense } from "react";
import {
	Await,
	Link,
	defer,
	useLoaderData,
	useLocation,
} from "react-router-dom";
import { Loader } from "../../components/Loader";
import { auth, getVan, rentVan } from "../../utils/api";

function VanDetails() {
	const location = useLocation();
	const search = `?${location.state?.search}` || "";
	const vansType = location.state?.type || "all";
	const data = useLoaderData();

	return (
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
										onClick={async () =>
											await rentVan({ userId: auth.currentUser.uid, van })
										}
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
	);
}

export function vanDetailsLoader({ params }) {
	const { id } = params;
	const van = getVan(id);
	return defer({ van });
}

export default VanDetails;
