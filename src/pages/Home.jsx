import React, { useEffect } from "react";
import { Card } from "../components/Card.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer();
	
	useEffect(() => {
		//personajes
		fetch("https://www.swapi.tech/api/people")
			.then(res => res.json())
			.then(data => {
				const arrayPeople = data.result.map (item =>
					fetch(item.url).then(res=>res.json())
				);
				Promise.all(arrayPeople).then(responses=> {
					const peopleDetails = responses.map(res=> ({
						uid: res.result.uid,
						name: res.result.properties.name,
						description: `Gender: ${res.result.properties.gender}, Hair: ${res.result.properties.hair_color}, Eyes: ${res.result.properties.eye_color}`

					} ) );
					dispatch({ type: "load_characters", payload: peopleDetails });
				});
			})
			.catch(err => console.error(err));

		//vehiculos
		fetch("https://www.swapi.tech/api/vehicles")
			.then(res => res.json())
			.then(data => {
				const arrayVehicles = data.result.map (item =>
					fetch(item.url).then(res=>res.json())
				);
				Promise.all(arrayVehicles).then(responses=> {
					const vehicleDetails = responses.map(res=> ({
						uid: res.result.uid,
						name: res.result.properties.name,
						description: `Model: ${res.result.properties.model}, Passengers: ${res.result.properties.passengers}`,

					} ) );
					dispatch({ type: "load_vehicles", payload: vehicleDetails });
				});
			})
			.catch(err => console.error(err));

		//planetas
		fetch("https://www.swapi.tech/api/planets")
			.then(res => res.json())
			.then(data => {
				const arrayPlanets = data.result.map (item =>
					fetch(item.url).then(res=>res.json())
				);
				Promise.all(arrayPlanets).then(responses=> {
					const planetsDetails = responses.map(res=> ({
						uid: res.result.uid,
						name: res.result.properties.name,
						description: `Population: ${res.result.properties.population}, Terrain: ${res.result.properties.terrain}`

					} ) );
					dispatch({ type: "load_planets", payload: planetsDetails });
				});
			})
			.catch(err => console.error(err));
	}, [dispatch]);

	console.log("Characters:", store.characters);
	console.log("Vehicles:", store.vehicles);
	console.log("Planets:", store.planets);

	return (
		<div className="text m-3 mt-5">
			<h1 className="text-danger">Characters</h1>
			{store.characters && store.characters.map(character => (
				<Card
					key={character.uid}
					id={character.uid}
					title={character.name}
					description={character.description}
					type="character"
					url={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
				/>
			))}

			<h1 className="text-danger">Vehiculos</h1>
			{store.vehicles && store.vehicles.map(vehicle => (
				<Card
					key={vehicle.uid}
					id={vehicle.uid}
					title={vehicle.name}
					description={vehicle.description}
					type="vehicle"
					url={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
				/>
			))}

			<h1 className="text-danger">Planetas</h1>
			{store.planets && store.planets.map(planet => (
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
	);
}; 