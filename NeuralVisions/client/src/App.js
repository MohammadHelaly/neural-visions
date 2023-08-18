import "./App.css";
import BackgroundCarousel from "./components/BackgroundCarousel/BackgroundCarousel";
import NavBar from "./components/NavBar/NavBar";
import HomeSection from "./components/HomeSection/HomeSection";
import VQnASection from "./components/VQnASection/VQnASection";
import AboutSection from "./components/AboutSection/AboutSection";
import ContactSection from "./components/ContactSection/ContactSection";
import Footer from "./components/Footer/Footer";

function App() {
	return (
		<>
			<BackgroundCarousel />
			<NavBar />
			<HomeSection />
			<VQnASection />
			<AboutSection />
			<ContactSection />
			<Footer />
		</>
	);
}

export default App;
