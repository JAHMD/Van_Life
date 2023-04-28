import { useOutletContext } from "react-router-dom";

function Details() {
	const { van } = useOutletContext();
	return (
		<div className="host-van-detail-info container">
			<h4>
				Name: <span>{van.name}</span>
			</h4>
			<h4>
				Category: <span>{van.type}</span>
			</h4>
			<h4>
				Description: <span>{van.description}</span>
			</h4>
			<h4>
				Visibility: <span>Public</span>
			</h4>
		</div>
	);
}

export default Details;
