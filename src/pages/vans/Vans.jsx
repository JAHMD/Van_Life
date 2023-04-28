import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Vans() {
	const [isLoading, setIsLoading] = useState(false);
	const [vans, setVans] = useState([]);
	const vansElements = vans.map((van) => {
		return (
			<div key={van.id} className="van-tile">
				<NavLink to={`${van.id}`}>
					<img src={van.imageUrl} alt="" loading="lazy" />
					<div className="van-info">
						<h3>{van.name}</h3>
						<p>
							${van.price}
							<span>/day</span>
						</p>
						<span className={`van-type ${van.type} selected`}>{van.type}</span>
					</div>
				</NavLink>
			</div>
		);
	});

	useEffect(() => {
		setIsLoading(true);
		fetch("/api/vans")
			.then((res) => res.json())
			.then(({ vans }) => {
				setVans(vans);
				setIsLoading(false);
			});
	}, []);

	return (
		<section className="van-list-container">
			{vans.length > 0 ? (
				<>
					<h1>Explore our van options</h1>
					<div className="van-list">{vansElements}</div>
				</>
			) : isLoading ? (
				<h2>Loading...</h2>
			) : (
				<h2>No Vans to dispaly</h2>
			)}
		</section>
	);
}

export default Vans;
