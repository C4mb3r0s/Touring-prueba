import React from "react";
import { Link } from "react-router-dom"

const HeroSection = () => (
    <section className="hero" id="1">
        <h1>Bienvenido a Volleyball For All</h1>
        <p>Descubre todo sobre el voleyball y accede a videos gratuitos</p>
        <Link to='/login'><button>¡Empezar!</button></Link>
    </section>
);

export default HeroSection;