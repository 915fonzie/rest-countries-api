import { useContext } from "react"
import { ThemeContext } from "./Layout"
import { motion } from "framer-motion"

export default function CountryCard({ flag, name, population, region, capital }) {
    const { theme } = useContext(ThemeContext)
    const itemVariants = {
        offscreen: {
            opacity: 0,
            y: 100
        },
        onscreen: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.6,
            }
        }
    }
    return (
        <motion.div
            className={`country-card ${theme}`}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{once: true, amount: 0.5}}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={itemVariants}
        >
            <img src={flag} />
            <div className="country-card-text">
                <h1>{name}</h1>
                <p><span>Population: </span>{population}</p>
                <p><span>Region: </span>{region}</p>
                <p><span>Capital: </span>{capital}</p>
            </div>
        </motion.div>
    )
}