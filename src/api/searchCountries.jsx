import { useQuery } from "@tanstack/react-query"

export default async function searchCountries(search) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${search}?fields=flags,name,population,region,capital`)
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return await response.json()
    } catch(error) {
        window.alert("No results found, try again")
        return "nothing"
    }
}