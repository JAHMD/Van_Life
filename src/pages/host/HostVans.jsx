import { NavLink, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../utils/api";
import { requireAuth } from "../../utils/requireAuth";

function HostVans() {
	const vans = useLoaderData();
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

	return (
		<div style={{ marginInline: "20px" }}>
			<h2 style={{ fontSize: "30px", marginTop: "1rem" }}>Your listed vans</h2>
			<div className="host-cards-list">
				{vans.length > 0 ? vansElements : <h3>Loading...</h3>}
			</div>
		</div>
	);
}

export async function hostLoader() {
	await requireAuth();
	return getHostVans();
}

export default HostVans;
