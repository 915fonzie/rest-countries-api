import { Link } from "react-router-dom";
import { ThemeContext } from "./Layout";
import { useContext } from "react";

export default function NavBar() {

    const {theme, toggleTheme} = useContext(ThemeContext)
    return (
        <header className={theme}>
            <nav>
                <Link to="/">Where in the world?</Link>
                <button onClick={toggleTheme}>Dark Mode</button>
            </nav>
        </header>
    )
}