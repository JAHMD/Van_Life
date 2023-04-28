import { useOutletContext } from "react-router-dom";

function Photos() {
	const { van } = useOutletContext();

	return <img src={van.imageUrl} alt="van image" />;
}

export default Photos;
