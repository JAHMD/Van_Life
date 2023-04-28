import { NavLink, Outlet } from "react-router-dom";

function HostLayout() {
	return (
		<section>
			<ul className="host-nav">
				<li>
					<NavLink to="." end>
						Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink to="income">Income</NavLink>
				</li>
				<li>
					<NavLink to="hvans">Vans</NavLink>
				</li>
				<li>
					<NavLink to="reviews">Reviews</NavLink>
				</li>
			</ul>
			<Outlet />
		</section>
	);
}

export default HostLayout;
