import React from "react";
import slide1 from "../../assets/images/bg-video-1.mp4";
import slide2 from "../../assets/images/bg-video-2.mp4";
import slide3 from "../../assets/images/bg-video-3.mp4";
import styles from "./BackgroundCarousel.module.css";

const BackgroundCarousel = () => {
	return (
		<div className={styles["background"]}>
			<div
				className={`carousel slide carousel-fade ${styles["background-carousel"]}`}
				data-bs-ride="carousel"
				data-bs-interval="3000"
				data-bs-pause="false">
				<div className="carousel-inner">
					<div
						className={`carousel-item active ${styles["background-carousel-item"]}`}>
						<video
							src={slide1}
							className={styles["background-video"]}
							autoPlay
							loop
							muted
							playsInline>
							Your browser does not support the video tag.
						</video>
					</div>
					<div
						className={`carousel-item ${styles["background-carousel-item"]}`}>
						<video
							src={slide2}
							className={styles["background-video"]}
							autoPlay
							loop
							muted
							playsInline>
							Your browser does not support the video tag.
						</video>
					</div>
					<div
						className={`carousel-item ${styles["background-carousel-item"]}`}>
						<video
							src={slide3}
							className={styles["background-video"]}
							autoPlay
							loop
							muted
							playsInline>
							Your browser does not support the video tag.
						</video>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BackgroundCarousel;
