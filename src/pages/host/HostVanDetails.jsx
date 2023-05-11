import { Suspense } from "react";
import {
	Await,
	Link,
	NavLink,
	Outlet,
	defer,
	useLoaderData,
} from "react-router-dom";
import { Loader } from "../../components/Loader";
import { getVan } from "../../utils/api";
import { requireAuth } from "../../utils/requireAuth";

export async function hostVansLoader({ params, request }) {
	const { id } = params;
	await requireAuth(request);
	const van = getVan(id);
	return defer({ van });
}

function HostVanDetails() {
	const data = useLoaderData();

	return (
		<div
			style={{
				marginInline: "20px",
				display: "flex",
				flexDirection: "column",
				flex: 1,
			}}
		>
			<Link to=".." className="back-button">
				&larr;<span>Back to all vans</span>
			</Link>

			<Suspense fallback={<Loader />}>
				<Await resolve={data.van}>
					{(van) => {
						return (
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
						);
					}}
				</Await>
			</Suspense>
		</div>
	);
}

export default HostVanDetails;
