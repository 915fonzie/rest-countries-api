export default async function getCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital")
    return await response.json()

}