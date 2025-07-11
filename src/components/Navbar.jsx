import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid d-flex justify-content-between align-items-center">
				<Link to="/" className="navbar-brand mb-0">
					<img
						className="img-fluid"
						style={{ width: "2cm", height: "auto" }}
						src="https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/images_without_background/64ef1bb0-48be-4647-a37a-fd3882764243.png"
						alt="Logo"
					/>
				</Link>

				<div className="dropdown">
					<button
						className="btn btn-primary dropdown-toggle"
						type="button"
						id="dropdownMenuButton"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favoritos{" "}
						<span className="badge bg-secondary ms-1">{store.favorites.length}</span>
					</button>
					<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
						{store.favorites.length === 0 && (
							<li className="dropdown-item text-muted">No hay favoritos</li>
						)}
						{store.favorites.map((fav) => (
							<li
								key={`${fav.type}-${fav.id}`}
								className="dropdown-item d-flex justify-content-between align-items-center"
							>
								<Link to={`/single/${fav.id}`} className="me-2">
									{fav.title}
								</Link>
								<button
									className="btn btn-sm btn-outline-danger"
									onClick={() =>
										dispatch({
											type: "remove_favorite",
											payload: { id: fav.id, type: fav.type },
										})
									}
									aria-label="Remove favorite"
								>
									<i className="fas fa-trash"></i>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};