// StarRating.js

import React from "react";
import { Input } from "reactstrap"; // Import the Input component from reactstrap

const StarRating = ({ id, name, value, onChange, maxStars }) => {
  const starOptions = Array.from({ length: maxStars }, (_, index) => index + 1);

  return (
    <Input
      type="select"
      id={id}
      name={name}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {starOptions.map((option) => (
        <option key={option} value={option}>
          {option} Star{option !== 1 ? "s" : ""}
        </option>
      ))}
    </Input>
  );
};

export default StarRating;
