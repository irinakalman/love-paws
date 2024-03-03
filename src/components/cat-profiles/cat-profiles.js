import React from 'react';
import './cat-profiles.css';
import { generate } from './generate/generate';

function CatProfile(props) {
    props = generate(props)
  return (
    <div className="cat-profile">
      <img src={props.image} alt={props.name} className="cat-image" />
      <h2>{props.name}</h2>
      <p>Age: {props.age} years</p>
      <p>{props.description}</p>
    </div>
  );
}

export default CatProfile;
