import SectionHeader from "../Miscellaneous/SectionHeader";
import styles from "./ContactSection.module.css";
import linkArrow from "../../assets/icons/box-arrow-up-right.svg";
import Icon from "../Miscellaneous/Icon";
import githubIcon from "../../assets/icons/github.svg";
import kaggleIcon from "../../assets/icons/k2.png";
import openaiIcon from "../../assets/icons/openai.png";
import vizwizIcon from "../../assets/icons/vizwiz4.png";
import gmailIcon from "../../assets/icons/gmail.jpg";
import useAnimate from "../../hooks/use-animate";

const ContactSection = () => {
	const paragraphRef = useAnimate(styles["animate"], false);
	const infoRef = useAnimate(styles["animate"], false);
	const linksRef = useAnimate(styles["animate"], false);
	return (
		<section id="contact">
			<div className="custom-container">
				<div className="container">
					<SectionHeader
						textTheme="light"
						titleText="Contact Us"
						subtitleText="Lorem ipsum dolor sit amet sangiune in feugiat purus lacinia"
					/>
					<div
						className={`text-light ${styles["contact-container"]}`}>
						<div>
							<p
								ref={paragraphRef}
								className={`lead ${styles["contact-paragraph"]}`}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Proin euismod libero non libero
								euismod, in feugiat purus lacinia. In hac
								habitasse platea dictumst. Suspendisse potenti.
								Aenean commodo, libero et tristique suscipit,
								neque odio vulputate est, nec malesuada libero
								ante id purus.
							</p>
							<div
								ref={infoRef}
								className={styles["contact-info"]}>
								<Icon
									link={true}
									to="mailto:"
									src={gmailIcon}
									alt="Gmail"
									iconClassName={`gm-icon ${styles["contact-gm-icon"]}`}
								/>
								<p
									className={`lead ${styles["contact-email"]}`}>
									email@email.com
								</p>
								<Icon
									link={true}
									to="mailto:"
									src={gmailIcon}
									alt="Gmail"
									iconClassName={`gm-icon ${styles["contact-gm-icon"]}`}
								/>
								<p
									className={`lead ${styles["contact-email"]}`}>
									email@email.com
								</p>
								<Icon
									link={true}
									to="mailto:"
									src={gmailIcon}
									alt="Gmail"
									iconClassName={`gm-icon ${styles["contact-gm-icon"]}`}
								/>
								<p
									className={`lead ${styles["contact-email"]}`}>
									email@email.com
								</p>
							</div>
						</div>
						<hr />
						<div
							ref={linksRef}
							className={styles["contact-links-container"]}>
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
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
