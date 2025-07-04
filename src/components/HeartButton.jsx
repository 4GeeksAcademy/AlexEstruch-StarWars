import { Link } from "react-router-dom";
import React, { useState } from "react";

export const HeartButton = () => {
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <button
            onclick={toggleLike}
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
            aria-label={liked ? "Unlike" : "Like"}
        >
            <i
                className={liked ? "fas fa-heart" : "far fa-heart"}
                style={{
                    color: "#ffc107",
                    fontSize: "22px",
                    transition: "color 0.3s ease",
                }}
            ></i>
        </button>

    );


};