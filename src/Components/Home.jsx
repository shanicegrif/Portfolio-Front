import React from "react";
import wolf from "../assets/images/the-wolverine-2013-movie-wide-hd-wallpaper.jpg"
import rings from "../assets/images/rings.jpeg"
import ahsoka from "../assets/images/ahsoka.jpeg"
import titanic from "../assets/images/titanic.jpeg"
import entergalactic from "../assets/images/entergalactic.png"

const Home = () => {
  return (
    <>
      <div className="home-page" style={{paddingBottom:"20px"}}>
        <img
          src="https://snworksceo.imgix.net/car/148c4ac7-aa5c-4635-9db6-87f4bcf1ab48.sized-1000x1000.jpeg?w=1000"
          alt="spiderman"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div>
        <h4>Welcome to FlickFleet.</h4>
        <p>
          Explore a vast collection of movies from various genres, including classics and the latest releases.
        </p>
        <p>
          Create your personalized watchlist, add your favorite movies, and keep track of what you want to watch.
        </p>
        <p>
          Get started now and immerse yourself in the exciting world of cinema!
        </p>
      </div>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={wolf} alt="First slide"/>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={rings} alt="Second slide"/>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={ahsoka} alt="Third slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={titanic} alt="Third slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={entergalactic} alt="Third slide" />
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
    </>
  );
};

export default Home;
