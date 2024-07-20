import githubIcon from "../../assets/icons/github.svg";
import kaggleIcon from "../../assets/icons/k2.png";
import openaiIcon from "../../assets/icons/openai.png";
import vizwizIcon from "../../assets/icons/vizwiz4.png";
import Icon from "../Miscellaneous/Icon";
import styles from "./HomeSection.module.css";

const HomeSection = () => {
	return (
		<div className={styles["parent-container"]}>
			<div className={styles["overlay-container"]}>
				<h1 className="display-1 text-light">NeuralVisions</h1>
				<p className="lead text-light bottom-lead">VisualQnA.</p>
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
						iconClassName="white-openai-icon"
					/>
					<Icon
						link={true}
						to="https://vizwiz.org/tasks-and-datasets/vqa/"
						src={vizwizIcon}
						alt="HackerRank"
						iconClassName="vw-icon"
					/>
				</p>
			</div>
		</div>
	);
};

export default HomeSection;
