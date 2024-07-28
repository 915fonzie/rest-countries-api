import { motion } from "framer-motion"
import getCountry from '../api/getCountry'
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { ThemeContext } from "../components/Layout"
import { useContext } from "react"

const countryDetailQuery = (name) => ({
    queryKey: ['country', name],
    queryFn: async () => getCountry(name)
})

export const loader = (queryClient) =>
    async ({params}) => {
        const query = countryDetailQuery(params.country.split('-').join(" "))
        return queryClient.ensureQueryData({
            queryKey: query.queryKey,
            queryFn: async () => getCountry(params.country.split('-').join(" ")),
          });
    } 

export default function CountryDetails() {
    window.scrollTo(0,0)
    const params = useParams()
    const {theme} = useContext(ThemeContext)
    const { data, isPending } = useQuery(countryDetailQuery(params.country.split('-').join(" ")))

    if (isPending) {
        return <h1>Loading...</h1>
    }

    return (
        <motion.div
            className={`details-container ${theme}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{duration: 0.2}}
            exit={{opacity: 0}}
        >
            <Link
                to="/"
            >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 128 128" xmlSpace="preserve">
                    <path d="M78.1 0v6.2c22.4 0 40.5 18.2 40.5 40.6s-18.1 40.6-40.5 40.6H17.9l27.9-28-4.5-4.5L5.5 90.8l36 36.2 4.5-4.5-28.8-28.9h60.9c25.8 0 46.7-21 46.7-46.8S103.9 0 78.1 0z"/>
                </svg>
                Back
            </Link>
            <div className="country">
                <div className="country-img-wrapper">
                    <img src={data[0].flags.svg} alt={`flag of ${data[0].name.common}`} />
                </div>
                <div className="country-text">
                    <h1>{data[0].name.common}</h1>
                    <div className="details">
                        <div>
                            <p><span>Native Name: </span>{data[0].name?.nativeName ? Object.values(data[0].name.nativeName)[0].common : "no data"}</p>
                            <p><span>Population: </span>{data[0].population ? data[0].population : "no-data"}</p>
                            <p><span>Region: </span>{data[0].region ? data[0].region : "no data"}</p>
                            <p><span>Sub Region: </span>{data[0].subregion ? data[0].subregion : "no data"}</p>
                            <p><span>Capital: </span>{data[0].capital ? data[0].capital[0] : "no data"}</p>
                        </div>
                        <div>
                            <p><span>Top Level Domain: </span>{data[0].tld ? data[0].tld[0] : "no data"}</p>
                            <p><span>Currencies: </span>{data[0].currencies ? Object.values(data[0].currencies)[0].name : "no data"}</p>
                            <p><span>Languages: </span>{data[0].languages ? Object.values(data[0].languages).join(", ") : "no data"}</p>
                        </div>
                    </div>
                    <div className="border-wrapper">
                        <p><span>Border Countries: </span></p>
                        <div className={`border ${theme}`}>
                            {data[0].borders?.map(country => { return <p key={country}>{country}</p>})}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}