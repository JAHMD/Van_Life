import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Vans() {
	const [vans, setVans] = useState([]);
	const vansElements = vans.map((van) => {
		return (
			<div key={van.id} className="van-tile">
				<NavLink to={van.id}>
					<img src={van.imageUrl} alt="" loading="lazy" />
					<div className="van-info">
						<h3>{van.name}</h3>
						<p>
							${van.price}
							<span>/day</span>
						</p>
					</div>
					<i className={`van-type ${van.type} selected`}>{van.type}</i>
				</NavLink>
			</div>
		);
	});

	useEffect(() => {
		fetch("/api/vans")
			.then((res) => res.json())
			.then(({ vans }) => setVans(vans));
	}, []);

	return (
		<section className="van-list-container">
			<h1>Explore our van options</h1>
			<div className="van-list">{vansElements}</div>
		</section>
	);
}

export default Vans;
