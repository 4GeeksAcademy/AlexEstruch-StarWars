import React, { useEffect } from "react";
import { Card } from "../components/Card.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		const fetchData = async () => {
			try {
				// personajes
				const resPeople = await fetch("https://www.swapi.tech/api/people");
				const dataPeople = await resPeople.json();
				const peopleDetails = [];

				for (const item of dataPeople.results) {
					const res = await fetch(item.url);
					const data = await res.json();
					const props = data.result.properties;
					peopleDetails.push({
						uid: data.result.uid,
						name: props.name,
						description: `Gender: ${props.gender}, Hair: ${props.hair_color}, Eyes: ${props.eye_color}`
					});
				}
				dispatch({ type: "load_characters", payload: peopleDetails });

				// vehiculos
				const resVehicles = await fetch("https://www.swapi.tech/api/vehicles");
				const dataVehicles = await resVehicles.json();
				const vehiclesDetails = [];

				for (const item of dataVehicles.results) {
					const res = await fetch(item.url);
					const data = await res.json();
					const props = data.result.properties;
					vehiclesDetails.push({
						uid: data.result.uid,
						name: props.name,
						description: `Model: ${props.model}, Passengers: ${props.passengers}`
					});
				}
				dispatch({ type: "load_vehicles", payload: vehiclesDetails });

				// planetas
				const resPlanets = await fetch("https://www.swapi.tech/api/planets");
				const dataPlanets = await resPlanets.json();
				const planetsDetails = [];

				for (const item of dataPlanets.results) {
					const res = await fetch(item.url);
					const data = await res.json();
					const props = data.result.properties;
					planetsDetails.push({
						uid: data.result.uid,
						name: props.name,
						description: `Population: ${props.population}, Terrain: ${props.terrain}`
					});
				}
				dispatch({ type: "load_planets", payload: planetsDetails });

			} catch (error) {
				console.error("Error al cargar datos:", error);
			}
		};

		fetchData();
	}, [dispatch]);
	console.log("characters:", store.characters);
	console.log("vehicles:", store.vehicles);
	console.log("planets:", store.planets);
	console.log("STORE COMPLETO:", store);
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
			
			<h1 className="text-danger">Vehiculos</h1>
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
			<div className="d-flex flex-row overflow-auto gap-3 py-2" style={{ flexWrap: "nowrap" }}>
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