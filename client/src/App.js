import "./App.css";
import Background from "./components/Background/Background";
import NavBar from "./components/NavBar/NavBar";
import HomeSection from "./components/HomeSection/HomeSection";
import VQnASection from "./components/VQnASection/VQnASection";
import AboutSection from "./components/AboutSection/AboutSection";
import ContactSection from "./components/ContactSection/ContactSection";
import Footer from "./components/Footer/Footer";

const App = () => {
	return (
		<>
			<Background />
			<NavBar />
			<HomeSection />
			<VQnASection />
			<AboutSection />
			<ContactSection />
			<Footer />
		</>
	);
};

export default App;
