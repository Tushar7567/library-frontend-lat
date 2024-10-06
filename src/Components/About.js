import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-box">
      <h2 className="about-title">About the Library</h2>
      <div className="about-data">
        <div className="about-img">
          <img
            src="https://images.unsplash.com/photo-1583468982228-19f19164aee2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=913&q=80"
            alt=""
          />
        </div>
        <div>
          <p className="about-text">
            Welcome to our Library Management System, your gateway to an
            extensive collection of books. Whether you're looking to buy, rent,
            or borrow, our platform offers a seamless experience tailored for
            book lovers and knowledge seekers.
            <br />
            <br />
            Our mission is to connect readers with a diverse range of books,
            ensuring that everyone has easy access to the literature they love.
            With a user-friendly interface, we make exploring, managing, and
            enjoying books effortless. From timeless classics to contemporary
            bestsellers, we aim to provide a collection that meets the needs of
            every reader.
            <br />
            <br />
            Whether you’re an individual or part of a larger institution, our
            system is designed to enhance the way you interact with books. Join
            us, and discover a new way to engage with the world of reading.
            <br />
            <br />
            Your suggestions for improvement are always welcomed!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
