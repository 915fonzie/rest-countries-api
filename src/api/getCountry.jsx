export default async function Country(search) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${search}`)
    return await response.json()
}