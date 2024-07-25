import React from "react";
import backgroundVideo from "../../assets/images/bg-video.mp4";
import styles from "./Background.module.css";

const Background = () => {
	return (
		<div className={styles["background"]}>
			<video
				src={backgroundVideo}
				className={styles["background-video"]}
				autoPlay
				loop
				muted
				playsInline>
				Your browser does not support the video tag.
			</video>
		</div>
	);
};

export default Background;
