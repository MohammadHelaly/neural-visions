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
				<div className={styles["footer-content"]}>
					<div>
						<p className={styles["copyright"]}>
							Background by{" "}
							<a
								href="https://objkt.com/@xponential"
								target="_blank"
								rel="noreferrer">
								xponentialdesign
							</a>
							.
						</p>
						<p className={styles["copyright"]}>
							Neural network deep learning model developed with{" "}
							<a
								href="https://pytorch.org/"
								target="_blank"
								rel="noreferrer">
								PyTorch
							</a>
							.
						</p>
						<p className={styles["copyright"]}>
							Deep learning model encorporated with the{" "}
							<a
								href="https://openai.com/research/clip/"
								target="_blank"
								rel="noreferrer">
								OpenAI CLIP encoder
							</a>
							.
						</p>
						<p className={styles["copyright"]}>
							Model trained on the{" "}
							<a
								href="https://vizwiz.org/tasks-and-datasets/vqa/"
								target="_blank"
								rel="noreferrer">
								VizWiz VQA dataset
							</a>
							.
						</p>
						<p className={styles["copyright"]}>
							Backend server developed with{" "}
							<a
								href="https://flask.palletsprojects.com/"
								target="_blank"
								rel="noreferrer">
								Flask
							</a>
							.
						</p>
						<p className={styles["copyright"]}>
							Developed with{" "}
							<a
								href="https://reactjs.org/"
								target="_blank"
								rel="noreferrer">
								React.js
							</a>
							.
						</p>
					</div>
					<Links />
				</div>
				<hr />
				<p className={styles["copyright"]}>&copy; {currentYear}</p>
			</div>
		</footer>
	);
};

export default Footer;
