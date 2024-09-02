import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/AboutPage.css";
import Ricardo from "../images/1RICARDO.png";
import Vyncent from "../images/1VYNCENT.png";
import Try from "../images/1TREMON.png";
import Lourdes from "../images/1LOURDES.png";
import Juan from "../images/1JUAN.png";
import whatis from "../images/whatis.webp";


function AboutPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-sections text-center">
        <div className="hero-contents">
          <h1>We are SPARK</h1>
          <p className="lead">Be a Welcomer by volunteering, engaging your business, and more.</p>
        </div>
      </section>

      <section className="stats-section text-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-md-3s">
              <h3>Welcome to Spark</h3>
              <p>your go-to platform for community service initiatives in the vibrant city of Charlotte. Spark is a digital hub designed to ignite positive change and foster a culture of giving back. Our mission is simple yet powerful: to connect passionate individuals with meaningful volunteer opportunities, creating a ripple effect of impact throughout our city.

At Spark, we believe that everyone has the ability to make a difference, no matter how big or small. Whether you're looking to volunteer for a local charity, participate in a community cleanup event, or lend a helping hand to those in need, Spark provides a seamless and user-friendly experience to help you find the perfect opportunity that aligns with your interests and schedule.

Join us in sparking change, building connections, and shaping a brighter future for Charlotte. Together, we can illuminate the path towards a more compassionate and thriving community. Let your light shine and make a difference with Spark today!</p>
            </div>

            <div className="col-md-3 col-md-3s">
              <img className="whatis" src={whatis}/>
            </div>
           
          </div>
        </div>
      </section>

      <section className="stats-sections stats-section text-center py-5">
        <div className="container">
          <h2 className="stats-title">We Have Helped Communities Thrive</h2>
          <div className="row">
            <div className="col-md-3">
              <h3>$120M</h3>
              <p>Funds raised for community projects</p>
            </div>
            <div className="col-md-3">
              <h3>250K</h3>
              <p>Volunteer hours contributed</p>
            </div>
            <div className="col-md-3">
              <h3>500+</h3>
              <p>Community events hosted</p>
            </div>
          
          </div>
          <div className="row">
            <div className="col-md-3">
              <h3>10K</h3>
              <p>Volunteers trained</p>
            </div>
            <div className="col-md-3">
              <h3>50+</h3>
              <p>Countries involved</p>
            </div>
            <div className="col-md-3">
              <h3>200+</h3>
              <p>Projects completed</p>
            </div>
            
          </div>
        </div>
      </section>


      <section className="stats-section text-center py-5">
        <div className="container">
          <h2 className="stats-title">Our Team</h2>
          <Slider {...settings}>
            <div className="col-md-3 Members">
              <img className="Members-pic" src={Juan} alt="Juan"/>
              <h3>Juan Casilla</h3>
            </div>
            <div className="col-md-3 Members">
              <img className="Members-pic" src={Lourdes} alt="Lourdes"/>
              <h3>Lourdes Villa</h3>
            </div>
            <div className="col-md-3 Members">
              <img className="Members-pic" src={Ricardo} alt="Ricardo"/>
              <h3>Ricardo Pena</h3>
            </div>
            <div className="col-md-3 Members">
              <img className="Members-pic" src={Try} alt="Try"/>
              <h3>Tremon Armstron</h3>
            </div>
            <div className="col-md-3 Members">
              <img className="Members-pic" src={Vyncent} alt="Vyncent"/>
              <h3>Vyncent Harris</h3>
            </div>
          </Slider>
        </div>
      </section>

   



    </>
  );
}

export default AboutPage;