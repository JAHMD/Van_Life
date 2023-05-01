import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

function HostVanDetails() {
	const { id } = useParams();
	const [van, setVan] = useState(null);

	useEffect(() => {
		fetch(`/api/host/vans/${id}`)
			.then((res) => res.json())
			.then(({ vans }) => setVan(vans));
	}, [id]);

	return (
		<div style={{ marginInline: "20px" }}>
			<Link to=".." className="back-button">
				&larr;<span>Back to all vans</span>
			</Link>
			{van ? (
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
			) : (
				<h3>Loading...</h3>
			)}
		</div>
	);
}

export default HostVanDetails;
