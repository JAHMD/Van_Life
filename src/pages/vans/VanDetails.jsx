import { Link, useLoaderData, useLocation } from "react-router-dom";
import { getVans } from "../../utils/api";

function VanDetails() {
	const location = useLocation();
	const search = `?${location.state?.search}` || "";
	const vansType = location.state?.type || "all";
	const van = useLoaderData();

	return (
		<section className="van-detail-container">
			<Link to={`..${search}`} state="" className="back-button">
				&larr;<span>Back to {vansType} vans</span>
			</Link>
			<div className="van-detail">
				<img src={van.imageUrl} loading="lazy" />
				<div className="container">
					<span className={`van-type ${van.type} selected`}>{van.type}</span>
					<h2>{van.name}</h2>
					<p className="van-price">
						<span>${van.price}</span>/day
					</p>
					<p>{van.description}</p>
					<button className="link-button">Rent this van</button>
				</div>
			</div>
		</section>
	);
}

export function vanDetailsLoader({ params }) {
	const { id } = params;
	return getVans(id);
}

export default VanDetails;
