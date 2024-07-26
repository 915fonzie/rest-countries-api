import { AnimatePresence } from "framer-motion"
import { cloneElement } from "react"
import { useLocation, useOutlet } from "react-router"

export default function AnimatedOutlet() {

    const location = useLocation()
    const element = useOutlet()

    return (
        <AnimatePresence mode="wait" initial={true}>
            {element && cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
    )
}