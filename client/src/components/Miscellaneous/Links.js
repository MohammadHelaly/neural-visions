import { ReactComponent as Github } from "../../assets/icons/github.svg";
import { ReactComponent as Kaggle } from "../../assets/icons/kaggle.svg";
import { ReactComponent as OpenAi } from "../../assets/icons/openai.svg";
import { ReactComponent as VizWiz } from "../../assets/icons/vizwiz.svg";
import Icon from "./Icon";
import styles from "./Links.module.css";

const Links = (props) => {
	const { variant } = props;

	const fillColor = variant === "dark" ? "#212529" : "#f8f9fa";

	return (
		<div className={styles["social-links-container"]}>
			<Icon
				link={true}
				to="https://github.com/MohammadHelaly/neural-visions">
				<Github
					height="30px"
					width="30px"
					className={`${styles["icon"]} ${styles["icon-link"]}`}
					fill={fillColor}
				/>
			</Icon>
			<Icon
				link={true}
				to="https://www.kaggle.com/code/mohammadhelaly/visual-question-answering-6870-6750-6952">
				<Kaggle
					height="30px"
					width="30px"
					className={`${styles["icon"]} ${styles["icon-link"]} ${styles["rounded-icon"]}`}
					fill={fillColor}
				/>
			</Icon>
			<Icon link={true} to="https://openai.com/research/clip">
				<OpenAi
					height="30px"
					width="30px"
					className={`${styles["icon"]} ${styles["icon-link"]} ${styles["rounded-icon"]}`}
					fill={fillColor}
				/>
			</Icon>
			<Icon link={true} to="https://vizwiz.org/tasks-and-datasets/vqa/">
				<VizWiz
					height="38px"
					width="38px"
					className={`${styles["icon"]} ${styles["icon-link"]}`}
					fill={fillColor}
				/>
			</Icon>
		</div>
	);
};

export default Links;
