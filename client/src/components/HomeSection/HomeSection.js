import Links from "../Miscellaneous/Links";
import styles from "./HomeSection.module.css";

const HomeSection = () => {
	return (
		<div className={styles["parent-container"]}>
			<div className={styles["overlay-container"]}>
				<h1 className="display-1 text-light">NeuralVisions</h1>
				<p className="lead text-light">VisualQnA.</p>
				<Links />
			</div>
		</div>
	);
};

export default HomeSection;
