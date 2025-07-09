// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state

// Define and export the Single component which displays individual item details.
export const Single = () => {
  const { store } = useGlobalReducer();
  const { theId } = useParams();

  // Buscar en characters, vehicles y planets el objeto cuyo uid sea theId
  // theId viene como string, los uids son strings en tus datos, así que no parseamos.
  const singleItem =
    store.characters.find(item => item.uid === theId) ||
    store.vehicles.find(item => item.uid === theId) ||
    store.planets.find(item => item.uid === theId);

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

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">{singleItem.name}</h1>
      <p>{singleItem.description}</p>
      <Link to="/" className="btn btn-primary mt-3">
        Back home
      </Link>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Single.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
