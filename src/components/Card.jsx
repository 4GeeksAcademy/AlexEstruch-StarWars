import React from "react";
import { Link } from "react-router-dom";
import { HeartButton } from "./HeartButton";

export const Card = ({ id, url, title, description, type }) => {
    return (
        <div className="card flex-shrink-0" style={{ width: "300px" }}>
            <img src={url} className="card-img-top" alt="card" style={{ height: "200px", objectFit: "cover" }} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>

                <div className="d-flex justify-content-between">
                    <Link to={`/details/${type}/${id}`} className="btn btn-outline-primary">
                        Learn More!
                    </Link>
                    <HeartButton id={id} title={title} url={url} type={type} />
                </div>
            </div>
        </div>
    );
};

