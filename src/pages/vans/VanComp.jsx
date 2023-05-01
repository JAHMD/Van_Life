import { NavLink } from "react-router-dom";

function VanComp({ searchParams, typeFilter, van }) {
	return (
		<div className="van-tile">
			<NavLink
				to={van.id}
				state={{ search: searchParams.toString(), type: typeFilter }}
			>
				<img src={van.imageUrl} alt="van image" loading="lazy" />
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
}

export default VanComp;
