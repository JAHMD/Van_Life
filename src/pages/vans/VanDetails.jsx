import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function VanDetails() {
	const location = useLocation();
	const search = `?${location.state?.search}` || "";
	const vansType = location.state?.type || "all";
	const { id } = useParams();
	const [van, setVan] = useState(null);

	useEffect(() => {
		fetch(`/api/vans/${id}`)
			.then((res) => res.json())
			.then(({ vans }) => setVan(vans));
	}, [id]);

	return (
		<section className="van-detail-container">
			<Link to={`..${search}`} state="" className="back-button">
				&larr;<span>Back to {vansType} vans</span>
			</Link>
			{van ? (
				<div className="van-detail">
					<img src={van.imageUrl} loading="lazy" />
					<i className={`van-type ${van.type} selected`}>{van.type}</i>
					<div className="container">
						<h2>{van.name}</h2>
						<p className="van-price">
							<span>${van.price}</span>/day
						</p>
						<p>{van.description}</p>
					</div>
					<button className="link-button">Rent this van</button>
				</div>
			) : (
				<h2>Loading...</h2>
			)}
		</section>
	);
}

export default VanDetails;
