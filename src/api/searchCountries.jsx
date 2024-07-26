export default async function searchCountries(search) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${search}?fields=flags,name,population,region,capital`)
    return await response.json()
}