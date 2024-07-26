import { motion } from "framer-motion"

export default function CountryDetails() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{duration: 1}}
            exit={{x: -300, opacity: 0}}
        >
            This is some Country
        </motion.div>
    )
}