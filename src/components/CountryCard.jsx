import { useContext } from "react"
import { ThemeContext } from "./Layout"

export default function CountryCard({ flag, name, population, region, capital }) {
    const {theme} = useContext(ThemeContext)
    return (
        <div className={`country-card ${theme}`}>
            <img src={flag} />
            <div className="country-card-text">
                <h1>{name}</h1>
                <p><span>Population: </span>{population}</p>
                <p><span>Region: </span>{region}</p>
                <p><span>Capital: </span>{capital}</p>
            </div>
        </div>
    )
}