import { Link } from "react-router-dom";


export default function NavBar() {
    return (
        <header>
            <nav>
                <Link to="/">Where in the world?</Link>
                <button>Dark Mode</button>
            </nav>
        </header>
    )
}