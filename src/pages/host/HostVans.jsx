import { Suspense } from "react";
import { Await, NavLink, defer, useLoaderData } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { auth, getHostVans } from "../../utils/api";
import { requireAuth } from "../../utils/requireAuth";

export async function hostLoader({ request }) {
	await requireAuth(request);
	const user = auth.currentUser;
	const { vans } = await getHostVans("KiDFNUy8XcMw1IAmfj5VTD5S4Nv1");
	return defer({ vans });
}

function HostVans() {
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
			<h2 style={{ fontSize: "30px", marginTop: "1rem" }}>Your listed vans</h2>
			<Suspense fallback={<Loader />}>
				<Await resolve={data.vans}>
					{(vans) => {
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
							<div className="host-cards-list">
								{vans.length > 0 ? vansElements : <h3>Loading...</h3>}
							</div>
						);
					}}
				</Await>
			</Suspense>
		</div>
	);
}

export default HostVans;
