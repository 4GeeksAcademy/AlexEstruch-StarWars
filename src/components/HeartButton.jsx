import React, { useContext } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const HeartButton = ({ id, title, url, type }) => {
    const { store, dispatch } = useGlobalReducer();

    const isFavorite = store.favorites.some(
        (fav) => fav.id === id && fav.type === type
    );

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({type: "remove_favorite", payload: { id, type }
            });
        } else {
            dispatch({type: "add_favorite", payload: { id, title, url, type }
            });
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            style={{
                width: "40px",
                height: "40px",
                backgroundColor: "transparent",
                border: "2px solid #ffc107",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
                outline: "none",
            }}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            <i
                className={isFavorite ? "fas fa-heart" : "far fa-heart"}
                style={{
                    color: "#ffc107",
                    fontSize: "22px",
                    transition: "color 0.3s ease",
                }}
            ></i>
        </button>

    );


};