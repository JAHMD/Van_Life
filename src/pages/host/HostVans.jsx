import { Suspense } from "react";
import { Await, NavLink, defer, useLoaderData } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { auth, getHostVans } from "../../utils/api";
import { requireAuth } from "../../utils/requireAuth";

export async function hostLoader({ request }) {
	const userId = auth?.currentUser?.uid;
	await requireAuth(request);
	const { vans } = await getHostVans(userId);
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
			<h2 style={{ fontSize: "30px" }}>Your listed vans</h2>
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
							<>
								{vans.length > 0 ? (
									<div className="host-cards-list">{vansElements}</div>
								) : (
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											flexDirection: "column",
											flex: 1,
										}}
									>
										<h3
											style={{ marginBottom: "1rem" }}
										>{`You don't have any vans yet.`}</h3>
										<NavLink to="/vans" className="link-button">
											Find your van
										</NavLink>
									</div>
								)}
							</>
						);
					}}
				</Await>
			</Suspense>
		</div>
	);
}

export default HostVans;
