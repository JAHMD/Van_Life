import { Suspense } from "react";
import { Await, defer, useLoaderData, useSearchParams } from "react-router-dom";
import FilterButtons from "../../components/FilterButtons";
import { Loader } from "../../components/Loader";
import { getVans } from "../../utils/api";
import VanComp from "./VanComp";

export async function vansLoader() {
	const vans = getVans();
	return defer({ vans });
}

function Vans() {
	const [searchParams, setSearchParams] = useSearchParams();
	const typeFilter = searchParams.get("type");
	const data = useLoaderData();

	function handleFilterChange(key, value) {
		setSearchParams((prevParams) => {
			if (value === null) {
				prevParams.delete(key);
			} else {
				prevParams.set(key, value);
			}
			return prevParams;
		});
	}

	return (
		<section className="van-list-container">
			<h1>Explore our van options</h1>
			<Suspense fallback={<Loader />}>
				<Await resolve={data.vans}>
					{(vans) => {
						const displayedVans = typeFilter
							? vans.filter((van) => van.type === typeFilter)
							: vans;

						const vansElements = displayedVans.map((van) => {
							return (
								<VanComp
									key={van.id}
									van={van}
									searchParams={searchParams}
									typeFilter={typeFilter}
								/>
							);
						});

						return (
							<>
								{vans?.length > 0 ? (
									<>
										<FilterButtons
											filterFunc={handleFilterChange}
											typeFilter={typeFilter}
										/>
										<div className="van-list">{vansElements}</div>
									</>
								) : (
									<h2>No Vans to dispaly</h2>
								)}
							</>
						);
					}}
				</Await>
			</Suspense>
		</section>
	);
}

export default Vans;
