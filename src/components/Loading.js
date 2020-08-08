import React from 'react';
import load from './inf.svg';

function Loading(){
    return(
    <div className="loading">
        <img src={load} alt="loading" />
    </div>
    );
}




export default Loading;