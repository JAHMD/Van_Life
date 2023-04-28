import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function HostVans() {
	const [vans, setVans] = useState([]);
	const vansElements = vans.map((van) => {
		return (
			<div key={van.id} className="host-van-card">
				<NavLink to={`${van.id}`}>
					<img src={van.imageUrl} alt="van image" />
					<div className="info">
						<h3>{van.name}</h3>
						<p>
							<span>{van.price}</span>/day
						</p>
					</div>
				</NavLink>
			</div>
		);
	});

	useEffect(() => {
		fetch("/api/host/vans")
			.then((res) => res.json())
			.then(({ vans }) => setVans(vans));
	}, []);
	return (
		<div style={{ marginInline: "20px" }}>
			<h2 style={{ fontSize: "30px", marginTop: "1rem" }}>Your listed vans</h2>
			<div className="host-cards-list">
				{vans.length > 0 ? vansElements : <h3>Loading...</h3>}
			</div>
		</div>
	);
}

export default HostVans;
