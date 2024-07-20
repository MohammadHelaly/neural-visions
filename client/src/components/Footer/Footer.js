import Links from "../Miscellaneous/Links";
import useAnimate from "../../hooks/use-animate";
import styles from "./Footer.module.css";

const Footer = () => {
	const currentYear = new Date().getFullYear();
	const elementRef = useAnimate(styles["animate"]);

	return (
		<footer className="bg-dark py-5">
			<div
				ref={elementRef}
				className={`container text-light ${styles["footer-container"]}`}>
				<Links />
				<hr />
				<p className={styles["copyright"]}>&copy; {currentYear}</p>
			</div>
		</footer>
	);
};

export default Footer;
