import React from "react";
import "../css/HomePage.css";
import image1 from "../images/pexels-olly-762020 (5).jpg"; // Importing images
import image2 from "../images/pexels-thyrone-paas-840706-1722198 (5).jpg"; // Importing images

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section text-center">
        <div className="hero-content">
          <h1>Giving is the only true acquisition, we get only as we give.</h1>
          <p className="lead">
            Charity refers to the act of giving or providing assistance...
          </p>
          <a href="/signup" className="btn btn-primary btn-lg">
            Get Started
          </a>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section text-center py-5">
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
            <div className="col-md-3">
              <h3>100%</h3>
              <p>Commitment to giving back</p>
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
            <div className="col-md-3">
              <h3>5M+</h3>
              <p>Meals provided</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section py-5">
        <div className="container">
          <div className="testimonial-content">
            <img src={image1} alt="Sarah P." className="testimonial-img" />
            <div className="testimonial-text">
              <p className="testimonial-quote">
                "The team's tireless passion and dedication are a powerful
                driving force. Being part of this meaningful cause is both
                humbling and deeply inspiring. It’s an honor to contribute,
                knowing the impact we make together.
              </p>
              <p className="testimonial-author">Sarah P.</p>
              <p className="testimonial-role">Community Volunteer</p>
            </div>
          </div>
          <div className="testimonial-content">
            <img src={image2} alt="John D." className="testimonial-img" />
            <div className="testimonial-text">
              <p className="testimonial-quote">
                "Supporting such a dedicated team is incredibly motivating, and
                the website makes it so easy to find the perfect volunteering
                opportunities. It’s empowering to see how simple it is to make a
                real difference."
              </p>
              <p className="testimonial-author">John D.</p>
              <p className="testimonial-role">Project Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="goals-section text-center py-5">
        <div className="container">
          <h2>Our Goals Are...</h2>
          <div className="row">
            <div className="col-md-4">
              <h3>Engage 5,000 Employees</h3>
              <p>
                Our goal is to motivate and engage 5,000 employees to volunteer
                in various community projects by the end of the year.
              </p>
            </div>
            <div className="col-md-4">
              <h3>Expand Services to 50 Employers</h3>
              <p>
                We aim to expand our volunteer matching services to 50
                additional employers, helping them find meaningful ways to
                contribute to their communities.
              </p>
            </div>
            <div className="col-md-4">
              <h3>Support 1,000 Volunteer Events</h3>
              <p>
                We are committed to supporting 1,000 volunteer events across
                various regions, ensuring each event has the resources and
                volunteers needed to succeed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
