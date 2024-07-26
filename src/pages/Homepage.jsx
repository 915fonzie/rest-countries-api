import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link, useLoaderData } from "react-router-dom"


export async function loader(queryClient) {
    const query = await queryClient.fetchQuery({
        queryKey: ['countries'],
        queryFn: async () => {
            const response = await fetch("https://restcountries.com/v3.1/all")
            return await response.json()
        }
    })
    return query
}

export default function Homepage() {

    const [data] = useState(useLoaderData())
    const [selectedCountries, setSelectedCountries] = useState([])

    useEffect(() => {

        const randomizedCountries = data.map(country => {
            return { country, r: Math.random() }
        }).sort((a, b) => a.r - b.r).map(a => a.country).slice(0, 10)

        setSelectedCountries(randomizedCountries)

    },[])



    console.log(selectedCountries)

    // const randomizedData = data.sort(() => 0.5 - Math.random())
    // const selectedCountries = randomizedData.slice(0, 10)

    // console.log(data)
    // console.log(selectedCountries)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{duration: 1}}
            exit={{x: -300, opacity: 0}}
        >
            This is homepage
            <Link to="./1">country</Link>
        </motion.div>
    )
}