import NavBar from "./NavBar";
import AnimatedOutlet from "./AnimatedOutlet";
import { createContext, useState } from "react";

const ThemeContext = createContext()

export default function Layout() {

    const [theme, setTheme] = useState("light-theme")

    function toggleTheme() {
        setTheme(prevTheme => prevTheme === "light-theme" ? "dark-theme" : "light-theme")
    }
    
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div className={`site-wrapper ${theme}`}>
                <NavBar />
                <AnimatedOutlet />
            </div>
        </ThemeContext.Provider>
    )
}

export { ThemeContext }