// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
  const { store } = useGlobalReducer();
  const { theId, type } = useParams();
  const navigate = useNavigate();

  // Obtener la lista correspondiente según el tipo
  const itemList = {
    character: store.characters,
    vehicle: store.vehicles,
    planet: store.planets,
  }[type] || [];

  const singleItem = itemList.find(item => item.uid === theId);

  if (!singleItem) {
    return (
      <div className="container text-center mt-5">
        <h2>Item not found</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Back home
        </Link>
      </div>
    );
  }

  const imageUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${type}s/${theId}.jpg`;
  

  // Campos clave para mostrar, adaptados según tipo
  // Esto depende de las propiedades que tengas en tu objeto singleItem.properties
  const detailsMap = {
    character: ["birth_year", "gender", "height", "skin_color", "eye_color"],
    vehicle: ["model", "manufacturer", "cost_in_credits", "length", "max_atmosphering_speed"],
    planet: ["climate", "terrain", "population", "gravity", "orbital_period"]
  };

  const detailFields = detailsMap[type] || [];

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="row mb-4">
        <div className="col-md-5">
          <img
            src={imageUrl}
            alt={singleItem.name}
            className="img-fluid rounded"
            onError={e => { e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"; }}
          />
        </div>

        <div className="col-md-7">
          <h1>{singleItem.name}</h1>
          <p>{singleItem.description || "No description available."}</p>
        </div>
      </div>

      <div className="row text-center border-top pt-3">
        {detailFields.map(field => (
          <div key={field} className="col border-end">
            <h5 className="text-danger text-uppercase">{field.replace(/_/g, " ")}</h5>
            <p>{singleItem.properties?.[field] || "Unknown"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};