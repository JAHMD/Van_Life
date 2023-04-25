import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Van() {
	const { id } = useParams();
	const [van, setVan] = useState(null);

	useEffect(() => {
		fetch(`/api/vans/${id}`)
			.then((res) => res.json())
			.then(({ vans }) => setVan(vans));
	}, [id]);

	return (
		<section className="van-detail-container">
			{van ? (
				<div className="van-detail">
					<img src={van.imageUrl} />
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

export default Van;
