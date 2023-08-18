import { useState, useEffect } from "react";
import SectionHeader from "../Miscellaneous/SectionHeader";
import styles from "../VQnASection/VQnASection.module.css";
import linkArrow from "../../assets/icons/box-arrow-up-right.svg";
import useAnimate from "../../hooks/use-animate";

const AboutSection = () => {
	const contentRef = useAnimate("animate", false);
	const linksRef = useAnimate("animate", false);
	return (
		<section id="about">
			<div className="custom-container">
				<div className="container">
					<SectionHeader
						textTheme="light"
						titleText="About VQnA"
						subtitleText="Lorem ipsum dolor sit amet sangiune"
					/>
					<div className="text-light about-container">
						<div ref={contentRef} className="about-content">
							<p className="lead">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Proin euismod libero non libero
								euismod, in feugiat purus lacinia. In hac
								habitasse platea dictumst. Suspendisse potenti.
								Aenean commodo, libero et tristique suscipit,
								neque odio vulputate est, nec malesuada libero
								ante id purus.
								<br />
								<br />
								Duis laoreet risus et nibh varius, ut feugiat
								ante egestas. Suspendisse dapibus in elit vel
								hendrerit. Nunc ac purus in dui ultrices varius
								a quis eros. Pellentesque vitae orci eget purus
								blandit rhoncus non sed quam. Cras bibendum
								tincidunt dolor, in ultrices ligula dictum eu.
								Aliquam semper libero a ex lacinia, ac venenatis
								dolor tincidunt.
								<br />
								<br />
								Quisque a quam ut dolor venenatis rhoncus ut et
								metus. Nulla vel purus in est fermentum
								consequat a ac justo. Nulla facilisi. Sed
								viverra, lectus eget malesuada bibendum, lectus
								est vulputate nisi, eget efficitur arcu purus id
								ante. Curabitur feugiat hendrerit metus, vel
								congue libero cursus eget. Quisque egestas
								dictum mauris, ac sollicitudin orci hendrerit
								sed. In euismod, arcu a egestas rhoncus, felis
								ex suscipit quam, id lacinia justo nulla ac
								quam. Fusce et mi nec lorem imperdiet semper id
								id arcu. Vivamus eleifend quam eu arcu eleifend,
								non congue ex eleifend. Nulla facilisi.
								<br />
								<br />
								Integer scelerisque nisl nec malesuada rhoncus.
								In hac habitasse platea dictumst. Nam gravida
								volutpat ante, at dictum ante laoreet a. Nullam
								id dolor non sapien luctus auctor. Integer
								lacinia nulla at lectus scelerisque, id
								vulputate tortor facilisis. Fusce vehicula sem
								eget varius rhoncus. Nullam a sem ut justo
								gravida finibus vel ac libero.
								<br />
								<br />
								Etiam lacinia libero vel nulla tincidunt
								efficitur. Duis egestas tortor quis lacus
								tristique, id auctor felis dignissim. Sed
								sagittis interdum nunc vel faucibus. Integer
								vulputate quam ac odio ultricies, ac euismod
								libero vestibulum. Curabitur vel dui ut libero
								commodo tincidunt nec sed erat. Sed varius
								aliquam elit ut facilisis. Quisque ac ligula eu
								turpis consectetur pellentesque.
								<br />
								<br />
								Praesent placerat purus id ipsum consectetur,
								nec hendrerit elit tristique. Suspendisse sed
								purus feugiat, tristique ante eu, venenatis
								ipsum. Donec vel metus vel justo placerat
								viverra. Nulla id nisl venenatis, ultrices ante
								quis, suscipit justo.
								<br />
								<br />
								Donec faucibus dapibus metus, id ultrices neque
								bibendum at. Sed vel nisi auctor, tincidunt dui
								non, consectetur quam. Nullam aliquam, nisi ut
								venenatis tristique, nisi dolor venenatis mi,
								vel malesuada risus justo nec purus. Etiam
								venenatis dui in urna bibendum, a fringilla quam
								facilisis. Nullam nec mi nec eros dapibus
								gravida. Ut egestas odio a arcu fermentum, in
								dictum metus fermentum. Donec cursus tortor id
								leo vehicula, ut euismod odio bibendum. In quis
								tincidunt nisi.
								<br />
								<br />
								Ut vulputate felis sit amet sapien laoreet, et
								viverra libero gravida. Quisque interdum, risus
								id dignissim pharetra, purus nisl tempus neque,
								a auctor est ex nec quam. Sed viverra ex vel
								efficitur.
							</p>
						</div>
						<hr />
						<div
							ref={linksRef}
							className="research-links-container">
							<a className="" href="">
								Read our paper
								<img className="link-arrow" src={linkArrow} />
							</a>
							<a className="" href="">
								View our code
								<img className="link-arrow" src={linkArrow} />
							</a>
							<a className="" href="">
								Read "Less is More"
								<img className="link-arrow" src={linkArrow} />
							</a>
							{/* <a className="lead" href="">
								Read about CLIP
								<img className="link-arrow" src={linkArrow} />
							</a> */}
							{/* <a className="lead" href="">
								Read about VizWiz VQA
								<img className="link-arrow" src={linkArrow} />
							</a> */}
							<a className="" href="">
								View original code
								<img className="link-arrow" src={linkArrow} />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
