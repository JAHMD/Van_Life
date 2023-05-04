import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../utils/api";
import { requireAuth } from "../../utils/requireAuth";

function HostVanDetails() {
	const van = useLoaderData();

	return (
		<div style={{ marginInline: "20px" }}>
			<Link to=".." className="back-button">
				&larr;<span>Back to all vans</span>
			</Link>
			<div className="hos-van-details-container">
				<div className="top">
					<img src={van.imageUrl} alt="van image" />
					<div className="info">
						<span className={`van-type ${van.type}`}>{van.type}</span>
						<h3>{van.name}</h3>
						<p className="price">
							<span>${van.price}</span>/day
						</p>
					</div>
				</div>
				<div className="bottom">
					<ul className="host-nav">
						<li>
							<NavLink end to="." van={van}>
								Details
							</NavLink>
						</li>
						<li>
							<NavLink to={`pricing`}>Pricing</NavLink>
						</li>
						<li>
							<NavLink to={`photos`}>Photos</NavLink>
						</li>
					</ul>
					<Outlet context={{ van }} />
				</div>
			</div>
		</div>
	);
}

export async function hostVansLoader({ params }) {
	const { id } = params;
	await requireAuth();
	return getHostVans(id);
}

export default HostVanDetails;
