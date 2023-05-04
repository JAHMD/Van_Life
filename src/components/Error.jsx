import { NavLink, useRouteError } from "react-router-dom";

function Error() {
	const error = useRouteError();
	return (
		<section
			className="error"
			style={{
				padding: "1rem",
			}}
		>
			<h2>Error: {error.message}</h2>
			<pre>
				{error.status} - {error.statusText}
			</pre>
			<NavLink to="/" className="link-button">
				Back to home page
			</NavLink>
		</section>
	);
}

export default Error;
