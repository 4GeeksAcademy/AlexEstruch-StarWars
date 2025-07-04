import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HeartButton } from "./HeartButton";

export const Card = ({ url, title, description }) => {

    return (
        <div class="card" style="width: 400px;">
            <img src={url} class="card-img-top" alt="card" style={{ width: "400px", height: "200px", objectFit: "cover" }}/>
            <div class="card-body">
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{description}</p>

                <div className="d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-primary">Primary</button>
                    <HeartButton />
                </div>
            </div>
        </div>
    );
};

