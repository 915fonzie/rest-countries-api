import { Link } from "react-router-dom";
import { ThemeContext } from "./Layout";
import { useContext } from "react";
import moon from '../assets/moon.svg'
import sun from '../assets/sun.svg'

export default function NavBar() {

    const {theme, toggleTheme} = useContext(ThemeContext)
    return (
        <header className={theme}>
            <nav>
                <Link to="/">Where in the world?</Link>
                <button onClick={toggleTheme}>
                    {theme === "light-theme" ? <img src={moon} style={{width: "20px"}}/> : <img src={sun} style={{width: "20px"}}/>}
                    Dark Mode
                </button>
            </nav>
        </header>
    )
}