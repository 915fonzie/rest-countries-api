export default async function getRegion(region) {
    const response = await fetch(`https://restcountries.com/v3.1/region/${region}?fields=flags,name,population,region,capital`)
    return await response.json()
}