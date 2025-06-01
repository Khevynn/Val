import HorizontalNavbar from "../components/layouts/HorizontalNavbar";
import VerticalNavbar from "../components/layouts/VerticalNavbar";

function Home() {
    return (
        <div className="w-screen h-screen bg-neutral-800">
            {/* NAVBAR VERTICAL */}
            <VerticalNavbar />
            <HorizontalNavbar />
        </div>
    )
}

export default Home;