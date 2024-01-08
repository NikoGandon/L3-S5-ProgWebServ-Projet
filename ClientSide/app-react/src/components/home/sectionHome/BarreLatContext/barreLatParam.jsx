import React, { useState, useEffect } from "react";

import axios from "../../../utils/axiosConf";

/**
 * @desc Affiche les paramètres de compte de l'utilisateur
 *
 */

const barreLatParam = () => {

    useEffect(() => {
        axios.get("https://localhost:3000/user/get-serveurs").then((res) => {
            setServeurs(res.data);
        });
    }, []);

    return (
        <div> param </div>
    )

};

export default barreLatParam;
