import { useMemo } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import FilterButtons from "../../components/FilterButtons";
import { getVans } from "../../utils/api";
import { requireAuth } from "../../utils/requireAuth";
import VanComp from "./VanComp";

function Vans() {
	const [searchParams, setSearchParams] = useSearchParams();
	const typeFilter = searchParams.get("type");
	const vans = useLoaderData();

	const displayedVans = useMemo(() => {
		return typeFilter ? vans.filter((van) => van.type === typeFilter) : vans;
	}, [typeFilter, vans]);

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
			{vans?.length > 0 ? (
				<>
					<h1>Explore our van options</h1>
					<FilterButtons
						filterFunc={handleFilterChange}
						typeFilter={typeFilter}
					/>
					<div className="van-list">{vansElements}</div>
				</>
			) : (
				<h2>No Vans to dispaly</h2>
			)}
		</section>
	);
}

export async function vansLoader() {
	// await requireAuth();
	return getVans();
}

export default Vans;
