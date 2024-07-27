import { motion } from "framer-motion"
import getCountry from '../api/getCountry'
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

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

    const params = useParams()
    const { data, isPending } = useQuery(countryDetailQuery(params.country.split('-').join(" ")))
    if (isPending) {
        return <h1>Loading...</h1>
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{duration: 0.7}}
            exit={{opacity: 0}}
        >
            <Link to="/">Back</Link>
            <div>
                <img src={data[0].flags.svg} />
                <div>
                    <h1>{data[0].name.common}</h1>
                    <div>
                        <p><span>Native Name: </span>{Object.values(data[0].name.nativeName)[0].common}</p>
                        <p><span>Population: </span>{data[0].population}</p>
                        <p><span>Region: </span>{data[0].region}</p>
                        <p><span>Sub Region: </span>{data[0].subregion}</p>
                        <p><span>Capital: </span>{data[0].capital[0]}</p>
                    </div>
                    <div>
                        <p><span>Top Level Domain: </span>{data[0].tld[0]}</p>
                        <p><span>Currencies: </span>{Object.values(data[0].currencies)[0].name}</p>
                        <p><span>Languages: </span>{Object.values(data[0].languages).join(", ")}</p>
                    </div>
                    <div>
                        <p><span>Border Countries: </span></p>
                        {data[0].borders?.map(country => { return <p key={country}>{country}</p>})}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}