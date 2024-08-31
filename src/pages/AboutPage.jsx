import React from "react";
import "../css/AboutPage.css";
import Ricardo from "../images/1RICARDO.png";
import Vyncent from "../images/1VYNCENT.png";
import Try from "../images/1TREMON.png";
import Lourdes from "../images/1LOURDES.png";
import Juan from "../images/1JUAN.png";

function AboutPage() {
  const images = [
    { src: Ricardo,  description: "Description for Image 1" },
    { src: Vyncent, description: "Description for Image 2" },
    { src: Lourdes, description: "Description for Image 3" },
    { src: Juan, description: "Description for Image 4" },
    {src: Try, description: "Description for Image 5" }
  ];

  return (
    <>
      <div className="about-page">
        <h1>We are SPARK</h1>
        <p></p>
      </div>
<div className="Members">
  <ul>
    {images.map((image, index) => (
      <li key={index}>
        <img className="Members-pic " src={image.src} alt={image.description} />
        <p>{image.description}</p>
      </li>
    ))}
  </ul>
</div>
<div className="about-page">
        <h1>We are SPARK</h1>
        <p></p>
      </div>


    </>
  );
}

export default AboutPage;