import SectionHeader from "../Miscellaneous/SectionHeader";
import styles from "./VQnASection.module.css";
import VQnAForm from "./VQnAForm";
import Slider from "../Miscellaneous/Slider";
import useAnimate from "../../hooks/use-animate";

const VQnASection = () => {
	const introRef = useAnimate(styles["animate"], false);

	return (
		<section id="vqna">
			<div className="custom-container">
				<div className="container">
					<SectionHeader
						textTheme="light"
						titleText="Try VQnA"
						subtitleText=""
					/>
					<div className={`text-light ${styles["vqna-container"]}`}>
						<div
							ref={introRef}
							className={`${styles["vqna-intro"]}`}>
							<p className="lead">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Proin euismod libero non libero
								euismod, in feugiat purus lacinia. In hac
								habitasse platea dictumst. Suspendisse potenti.
								Aenean commodo, libero et tristique suscipit,
								neque odio vulputate est, nec malesuada libero
								ante id purus.
							</p>
						</div>
						<hr />
						<VQnAForm />
					</div>
				</div>
				<Slider
					scrollValue="700"
					originalSliderClassName={styles["slider"]}
					newSliderClassName={styles["new-slider"]}
				/>
			</div>
		</section>
	);
};

export default VQnASection;
