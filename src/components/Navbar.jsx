import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid d-flex justify-content-between align-items-center">
				<Link to="/" className="navbar-brand mb-0"><img className="img-fluid" style={{ width: "2cm", height: "auto" }} src="https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/images_without_background/64ef1bb0-48be-4647-a37a-fd3882764243.png" alt="Logo" />
				</Link>
				<Link to="/demo">
					<div class="dropdown">
						<a class="btn btn-primary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favoritos
						</a>

						<ul class="dropdown-menu">
							<li><a class="dropdown-item" href="#">Action</a></li>
							<li><a class="dropdown-item" href="#">Another action</a></li>
							<li><a class="dropdown-item" href="#">Something else here</a></li>
						</ul>
					</div>
				</Link>
			</div>
		</nav>
	);
};