import React from "react";
import Pokemon from "./Pokemon";
import Info from "./Info";


const Main =()=>{
    
    return(
        <>
        <div className="container">

            <div className="leftBar">
                <Pokemon/>
                <Pokemon/>
                <Pokemon/>
                <Pokemon/>
                <Pokemon/>
                <Pokemon/>
            </div>
            
            <div className="rightBar">
                <Info/>
            </div>

        </div>
        </>
    )
}

export default Main;
