import { useState, useEffect } from "react";
import styles from "./Notifications.module.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-icon.svg";

const Notifications = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(true);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={`toast-container ${styles["toast-notification-container"]}`}>
			<div
				id="contact-form-toast"
				className={`toast ${visible ? "show" : ""} ${
					styles["toast-notification"]
				}`}
				role="alert"
				aria-live="assertive"
				aria-atomic="true">
				<div
					className={`toast-header ${styles["toast-notification-header"]}`}>
					<button
						type="button"
						data-bs-dismiss="toast"
						aria-label="Close"
						className={`${styles["toast-notification-button"]}`}>
						<CloseIcon fill="#212529" height="20px" width="20px" />
					</button>
				</div>
				<div className="toast-body">
					<p>
						This web app is still under development. Some features
						may not work as expected.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Notifications;
