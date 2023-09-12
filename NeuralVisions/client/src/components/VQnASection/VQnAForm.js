import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import useAnimate from "../../hooks/use-animate";
import styles from "./VQnAForm.module.css";

const schema = z.object({
	question: z.string().nonempty(),
	image_url: z.string().url().optional(),
	image: z
		.any()
		.optional()
		.refine((data) => {
			if (data && data[0] && data[0].type) {
				return data[0].type.startsWith("image/");
			}
			return true;
		}),
});

const VQnAForm = () => {
	const [answer, setAnswer] = useState("--");
	const [answerType, setAnswerType] = useState("--");
	const [answerability, setAnswerability] = useState("--");
	const formRef1 = useAnimate(styles["animate"], false);
	const formRef2 = useAnimate(styles["animate"], false);
	const questionRef = useAnimate(styles["animate-field"], false);
	const imageRef = useAnimate(styles["animate-field"], false);
	const imageUrlRef = useAnimate(styles["animate-field"], false);
	const resultsRef = useAnimate(styles["animate"], false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		mode: "onTouched",
		resolver: zodResolver(schema),
	});

	const onSubmit = (data) => {
		const formData = new FormData();

		formData.append("question", data.question);
		if (data.image) {
			formData.append("image", data.image[0]);
		} else if (data.image_url) {
			formData.append("image_url", data.image_url);
		}

		setAnswer("Loading...");
		setAnswerType("Loading...");
		setAnswerability("Loading...");

		axios
			.post("http://localhost:5000/predict", formData)
			.then((res) => {
				const originalAnswer = res.data.answer;
				const originalAnswerType = res.data.answer_type;
				const originalAnswerability = res.data.answerability;

				const modifiedAnswer = originalAnswer.endsWith(".")
					? originalAnswer
					: originalAnswer + ".";
				const modifiedAnswerType = originalAnswerType.endsWith(".")
					? originalAnswerType
					: originalAnswerType + ".";
				const modifiedAnswerability =
					((1 - originalAnswerability) * 100).toFixed(0) + "%";

				const capitalizedAnswer =
					modifiedAnswer.charAt(0).toUpperCase() +
					modifiedAnswer.slice(1);
				const capitalizedAnswerType =
					modifiedAnswerType.charAt(0).toUpperCase() +
					modifiedAnswerType.slice(1);

				setAnswer(capitalizedAnswer);
				setAnswerType(capitalizedAnswerType);
				setAnswerability(modifiedAnswerability);
			})
			.catch((err) => {
				setAnswer("Something went wrong...");
				setAnswerType("--");
				setAnswerability("--");
			});
	};

	return (
		<div className={styles["vqna"]}>
			<div
				ref={formRef1}
				className={`${styles["vqna-form"]} container mt-5`}>
				<div className={`card ${styles["form-card"]}`}>
					<div className="card-body">
						<h1 className="card-title display-6">Ask a Question</h1>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div
								ref={questionRef}
								className={`form-floating mb-4 ${styles["form-field"]}`}>
								<input
									type="text"
									className={`form-control ${
										styles["custom-input"]
									} ${errors.question ? "is-invalid" : ""}`}
									{...register("question")}
								/>
								<label
									htmlFor="question"
									className={`${styles["label"]} ${
										errors.question
											? styles["invalid-label"]
											: ""
									}`}>
									Question:
								</label>
							</div>
							<div
								ref={imageRef}
								className={`form-floating mb-4 ${styles["form-field"]}`}>
								<input
									type="file"
									accept="image/*"
									className={`form-control ${
										styles["custom-input"]
									} ${errors.image ? "is-invalid" : ""}`}
									{...register("image", {
										disabled:
											watch("image_url") !== undefined &&
											watch("image_url") !== "",
									})}
								/>
							</div>
							<div
								ref={imageUrlRef}
								className={`form-floating mb-4 ${styles["form-field"]}`}>
								<input
									type="text"
									className={`form-control ${
										styles["custom-input"]
									} ${errors.image_url ? "is-invalid" : ""}`}
									{...register("image_url", {
										disabled:
											watch("image") !== undefined &&
											watch("image")[0] !== undefined,
									})}
								/>
								<label
									htmlFor="image_url"
									className={`${styles["label"]} ${
										errors.image_url
											? styles["invalid-label"]
											: ""
									}`}>
									Image URL:
								</label>
							</div>
							<button
								type="submit"
								className={`btn btn-dark ${styles["form-button"]}`}>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
			<div
				ref={formRef2}
				className={`${styles["vqna-form"]} container mt-5`}>
				<div className={`card ${styles["form-card"]}`}>
					<div className="card-body text-center">
						<div ref={resultsRef} className={styles["results"]}>
							<p className="lead">Answer:</p>
							<h2 className="display-6">{answer}</h2>
							<br />
							<p className="lead">Answer Type:</p>
							<h2 className="display-6">{answerType}</h2>
							<br />
							<p className="lead">Answerability:</p>
							<h3 className="display-6">{answerability}</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VQnAForm;
