import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar fixed-top">
            <Link to="/movies">
                <h1 className="navLink-home">FlickFleet</h1>
            </Link>
            <Link to="/movies/new">
                <button className="navLink-new">Add New Movie</button>
            </Link>
        </nav>
    );
}

export default NavBar;
