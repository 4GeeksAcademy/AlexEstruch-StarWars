import React, { useEffect } from "react";
import { Card } from "../components/Card.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer();
	useEffect(() => {
		//personajes
		fetch("https://www.swapi.tech/api/people/1")
			.then(res => res.json())
			.then(data => {
				dispatch({ type: "load_characters", payload: data.results });
			})
			.catch(err => console.error(err));

		//vehiculos
		fetch("https://www.swapi.tech/api/vehicles/4")
			.then(res => res.json())
			.then(data => {
				dispatch({ type: "load_vehicles", payload: data.results });
			})
			.catch(err => console.error(err));

		//planetas
		fetch("https://www.swapi.tech/api/planets/1")
			.then(res => res.json())
			.then(data => {
				dispatch({ type: "load_planets", payload: data.results });
			})
			.catch(err => console.error(err));
	}, [dispatch]);

	return (
		<div className="text m-3 mt-5">
			<h1 className="text-danger">Characters</h1>
			{store.characters && store.characters.map(character => (
				<Card
					key={character.uid}
					title={character.name}
					description={`More info`}
					url={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
				/>
			))}

			<h1 className="text-danger">Vehiculos</h1>
			{store.vehicles && store.vehicles.map(vehicle => (
				<Card
					key={vehicle.uid}
					title={vehicle.name}
					description={`More info`}
					url={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
				/>
			))}

			<h1 className="text-danger">Planetas</h1>
			{store.planets && store.planets.map(planet => (
				<Card
					key={planet.uid}
					title={planet.name}
					description={`More info`}
					url={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
				/>
			))}

		</div>
	);
}; 