import { NavLink } from "react-router-dom";

function Home() {
	return (
		<section className="home-container">
			<div className="container">
				<h1>You got the travel plans, we got the travel vans.</h1>
				<p>
					Add adventure to your life by joining the #vanlife movement. Rent the
					perfect van to make your perfect road trip.
				</p>
				<NavLink to="vans" className="link-button">
					Find your van
				</NavLink>
			</div>
		</section>
	);
}

export default Home;
