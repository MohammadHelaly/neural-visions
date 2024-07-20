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
								Try out our VQnA system to get answers to your
								questions. See our deep learning model in action
								for yourself and witness its accuracy and
								efficiency firsthand. Experience the power of
								our cutting-edge neural network model and
								enhance your understanding of its capabilities.
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
