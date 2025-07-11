import React, { useEffect } from "react";
import { Card } from "../components/Card.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		const fetchCategory = async (category, type) => {
			try {
				const res = await fetch(`https://www.swapi.tech/api/${category}`);
				const data = await res.json();

				// Segundo fetch para cada item (detalles)
				const detailedItems = await Promise.all(
					data.results.map(async (item) => {
						try {
							const detailRes = await fetch(item.url);
							const detailData = await detailRes.json();
							return {
								uid: item.uid,
								name: item.name,
								description: detailData.result.description,
								properties: detailData.result.properties,
							};
						} catch (err) {
							console.error(`Error fetching detail for ${item.name}:`, err);
							return {
								uid: item.uid,
								name: item.name,
								description: "Description not available.",
								properties: {},
							};
						}
					})
				);

				dispatch({ type, payload: detailedItems });
			} catch (error) {
				console.error(`Error fetching ${category}:`, error);
			}
		};

		fetchCategory("people", "load_characters");
		fetchCategory("vehicles", "load_vehicles");
		fetchCategory("planets", "load_planets");
	}, [dispatch]);

	return (
		<div className="text m-3 mt-5">
			<h1 className="text-danger">Characters</h1>
			<div className="d-flex overflow-auto gap-3 py-2" style={{ flexWrap: "nowrap" }}>
				{store.characters?.map(character => (
					<Card
						key={character.uid}
						id={character.uid}
						title={character.name}
						description={character.description}
						type="character"
						url={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
					/>
				))}
			</div>

			<h1 className="text-danger">Vehículos</h1>
			<div className="d-flex overflow-auto gap-3 py-2" style={{ flexWrap: "nowrap" }}>
				{store.vehicles?.map(vehicle => (
					<Card
						key={vehicle.uid}
						id={vehicle.uid}
						title={vehicle.name}
						description={vehicle.description}
						type="vehicle"
						url={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
					/>
				))}
			</div>

			<h1 className="text-danger">Planetas</h1>
			<div className="d-flex overflow-auto gap-3 py-2" style={{ flexWrap: "nowrap" }}>
				{store.planets?.map(planet => (
					<Card
						key={planet.uid}
						id={planet.uid}
						title={planet.name}
						description={planet.description}
						type="planet"
						url={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
					/>
				))}
			</div>
		</div>
	);
};