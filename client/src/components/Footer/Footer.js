import githubIcon from "../../assets/icons/github.svg";
import kaggleIcon from "../../assets/icons/k2.png";
import openaiIcon from "../../assets/icons/openai.png";
import vizwizIcon from "../../assets/icons/vizwiz4.png";
import useAnimate from "../../hooks/use-animate";
import Icon from "../Miscellaneous/Icon";
import styles from "./Footer.module.css";

const Footer = () => {
	const currentYear = new Date().getFullYear();
	const elementRef = useAnimate(styles["animate"]);

	return (
		<footer className="bg-dark py-5">
			<div
				ref={elementRef}
				className={`container text-light ${styles["footer-container"]}`}>
				<p className="link-line">
					<Icon
						link={true}
						to="https://github.com/MohammadHelaly/Visual-Question-Answering"
						src={githubIcon}
						alt="GitHub"
					/>
					<Icon
						link={true}
						to="https://www.kaggle.com/code/mohammadhelaly/visual-question-answering-6870-6750-6952"
						src={kaggleIcon}
						alt="LinkedIn"
					/>
					<Icon
						link={true}
						to="https://openai.com/research/clip"
						src={openaiIcon}
						alt="OpenAI"
					/>
					<Icon
						link={true}
						to="https://vizwiz.org/tasks-and-datasets/vqa/"
						src={vizwizIcon}
						alt="HackerRank"
						iconClassName="vw-icon"
					/>
				</p>
				<hr />
				<p className={styles["copyright"]}>&copy; {currentYear}</p>
			</div>
		</footer>
	);
};

export default Footer;
