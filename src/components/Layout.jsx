import NavBar from "./NavBar";
import AnimatedOutlet from "./AnimatedOutlet";
import { createContext, useState } from "react";
import { ScrollRestoration } from "react-router-dom";

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
            <ScrollRestoration getKey={(location, matches) => {
                return location.key
            }}/>
        </ThemeContext.Provider>
    )
}

export { ThemeContext }