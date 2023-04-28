import { useOutletContext } from "react-router-dom";

function Pricing() {
	const { van } = useOutletContext();

	return (
		<p style={{ fontSize: "2rem" }}>
			<span style={{ fontWeight: "bold" }}>${van.price}</span>/day
		</p>
	);
}

export default Pricing;
