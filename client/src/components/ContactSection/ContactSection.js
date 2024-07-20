import styles from "./ConstactSection.module.css";
import SectionHeader from "../Miscellaneous/SectionHeader";
import ContactInformation from "./ContactInformation";
import useAnimate from "../../hooks/use-animate";
import contactData from "../../assets/data/contactData";

const ContactSection = () => {
	const paragraphRef = useAnimate(styles["animate"], false);

	return (
		<section id="contact">
			<div className="custom-container">
				<div className="container">
					<SectionHeader
						titleText="Contact Us"
						subtitleText="Get in touch with the team behind NeuralVisions."
						textTheme="light"
					/>
					<div
						className={`text-light ${styles["contact-container"]}`}>
						<div>
							<p
								ref={paragraphRef}
								className={`lead ${styles["contact-paragraph"]}`}>
								We are a group of passionate computer
								engineering students from Alexandria University
								who have a strong passion for deep learning and
								artificial intelligence. We developed
								NeuralVisions as part of our Pattern Recognition
								course project. Our goal is to contribute our
								skills and knowledge while inspiring others'
								interest in the field.
							</p>
						</div>
						<hr />
						<div className={`${styles["contacts"]}`}>
							{contactData.map((contact, index) => {
								return (
									<ContactInformation
										key={"CI - " + index}
										name={contact.name}
										photo={contact.photo}
										gmailLink={contact.gmailLink}
										linkedinLink={contact.linkedinLink}
										githubLink={contact.githubLink}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
