import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import { useQueries } from "@tanstack/react-query";
import getCountries from "../api/getCountries";
import getRegion from "../api/getRegion"
import { ThemeContext } from "../components/Layout";
import { useDebounce } from "rooks";

const countryQuery = () => ({
  queryKey: ["countries"],
  queryFn: async () => getCountries(),
});
const regionQuery = (region) => ({
  queryKey: ["region", region],
  queryFn: async () => getRegion(region),
});

export const loader = (queryClient) => async () => {
  const query = countryQuery();
  return queryClient.ensureQueryData({
    queryKey: query.queryKey,
    queryFn: async () => getCountries(),
  });
};

export default function Homepage() {

  const { theme } = useContext(ThemeContext);
  const debouncedSubmit = useDebounce((e) => handleSearch(e), 500);

  const queries = useQueries({
    queries:
    [
      countryQuery(),
      regionQuery('africa'),
      regionQuery('america'),
      regionQuery('asia'),
      regionQuery('europe'),
      regionQuery('oceania'),
    ]
  });
  
  const [selectedCountries, setSelectedCountries] = useState(queries[0].data);
  const [selectedRegion, setSelectedRegion] = useState("Filter by Region");
  const [isOpen, setIsOpen] = useState(false);

  const list = {
    open: {
      clipPath: "inset(0% 0% 0% 0% round 5px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
    closed: {
      clipPath: "inset(10% 50% 90% 50% round 5px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3,
      },
    },
  };

  const item = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const CountryCardElements = selectedCountries.map((country) => {
    const { name, flags, population, region, capital } = country;
    return (
      <Link
        to={name.official.split(' ').join('-')}
        key={name.official}
        preventScrollReset={true}
      >
        <CountryCard
          name={name.common}
          flag={flags.svg}
          population={population}
          region={region}
          capital={capital}
          />
        </Link>
    );
  });

  function handleSelect(event) {
    if (event.target.matches("li")) {
      setSelectedRegion(event.target.innerText);
      setIsOpen(false);
      if (event.target.innerText === "All") {
        setSelectedCountries(queries[0].data)
      }
      if (event.target.innerText === "Africa") {
        setSelectedCountries(queries[1].data)
      }
      if (event.target.innerText === "America") {
        setSelectedCountries(queries[2].data)
      }
      if (event.target.innerText === "Asia") {
        setSelectedCountries(queries[3].data)
      }
      if (event.target.innerText === "Europe") {
        setSelectedCountries(queries[4].data)
      }
      if (event.target.innerText === "Oceania") {
        setSelectedCountries(queries[5].data)
      }
    }
  }

  function handleSearch(search) {
    if (search === "") {
      setSelectedCountries(queries[0].data)
    }
    else {
      setSelectedCountries(queries[0].data.filter(country => {
        return(
          country.name.official.toLowerCase().includes(search.toLowerCase()) ||
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
      }))
    }
  }

  return (
    <motion.div
      className={`home-container ${theme}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      style={{ willChange: "auto" }}
    >
      <div className={`inputs ${theme}`}>
        <form id="search-form" role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            id="querySearch"
            className={`${theme}`}
            name="querySearch"
            type="search"
          placeholder="Search for a country..."
            onChange={(e) => debouncedSubmit(e.target.value)}
            onSubmit={(e) => handleSearch(e.target.value, e.currentTarget.form)}
          />
          </form>
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className={`menu ${theme}`}
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedRegion}
            <motion.div
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.2 }}
              style={{ originY: 0.55 }}
            >
              <svg width="15" height="15" viewBox="0 0 20 20">
                <path d="M0 7 L 20 7 L 10 16" />
              </svg>
            </motion.div>
          </motion.button>
          <motion.ul
            variants={list}
            style={{ pointerEvents: isOpen ? "auto" : "none" }}
            onClick={(e) => handleSelect(e)}
          >
            <motion.li variants={item}>All</motion.li>
            <motion.li variants={item}>Africa</motion.li>
            <motion.li variants={item}>America</motion.li>
            <motion.li variants={item}>Asia</motion.li>
            <motion.li variants={item}>Europe</motion.li>
            <motion.li variants={item}>Oceania</motion.li>
          </motion.ul>
        </motion.nav>
      </div>
      <div className="cards-container">
        {CountryCardElements.length > 0 ? CountryCardElements : <h1>No Results Found</h1>}
      </div>
    </motion.div>
  );
}
