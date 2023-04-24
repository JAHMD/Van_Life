import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Van() {
	const { id } = useParams();
	const [van, setVan] = useState({});

	useEffect(() => {
		fetch(`/api/vans/${id}`)
			.then((res) => res.json())
			.then(({ vans }) => setVan(vans));
	}, []);

	return (
		<section>
			<div className="van-tile">
				<img src={van.imageUrl} alt="" loading="lazy" />
				<div className="van-info">
					<h3>{van.name}</h3>
					<p>
						${van.price}
						<span>/day</span>
					</p>
				</div>
				<p>{van.description}</p>
				<i className={`van-type ${van.type} selected`}>{van.type}</i>
			</div>
		</section>
	);
}

export default Van;
