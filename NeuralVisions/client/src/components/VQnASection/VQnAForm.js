import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import useAnimate from "../../hooks/use-animate";

const schema = z
	.object({
		question: z.string().nonempty(),
		image_url: z.string().optional(),
		image: z.any().optional(),
	})
	.refine(
		(data) => {
			return data.image[0] || data.image_url;
		},
		{ message: "Please upload an image or provide an image URL." }
	);

const VQnAForm = () => {
	const [answer, setAnswer] = useState("It's Sunny.");
	const [answerType, setAnswerType] = useState("Other");
	const [answerability, setAnswerability] = useState("86%");
	const formRef1 = useAnimate("animate-form", false);
	const formRef2 = useAnimate("animate-form", false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onSubmit",
		resolver: zodResolver(schema),
	});

	const onSubmit = (data) => {
		const formData = new FormData();

		formData.append("question", data.question);
		if (data.image[0]) {
			formData.append("image", data.image[0]);
		} else if (data.image_url) {
			formData.append("image_url", data.image_url);
		}
		console.log(data);
		console.log(formData);
		setAnswer("Loading...");
		setAnswerType("Loading...");
		setAnswerability("Loading...");

		axios
			.post("http://localhost:5000/predict", formData)
			.then((res) => {
				console.log(res);

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
				// setAnswer(res.data.answer);
				// setAnswerType(res.data.answer_type);
				setAnswerability(modifiedAnswerability);
			})
			.catch((err) => {
				console.error("Error sending data:", err);
				setAnswer("Something went wrong...");
				setAnswerType("--");
				setAnswerability("--");
			});
	};

	return (
		<div className="vqna">
			<div ref={formRef1} className="vqna-form container mt-5">
				<div className="card">
					<div className="card-body">
						<h1 className="card-title display-6">Ask a Question</h1>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="form-floating mb-4">
								<input
									type="text"
									className={`form-control custom-input ${
										errors.question ? "is-invalid" : ""
									}`}
									{...register("question")}
								/>
								<label
									htmlFor="question"
									className={`label ${
										errors.question ? "invalid-label" : ""
									}`}>
									Question:
								</label>
								{/* <div className="invalid-feedback">
									{errors.question?.message}
								</div> */}
							</div>
							<div className="form-floating mb-4">
								<input
									type="file"
									className={`form-control custom-input ${
										errors.image ? "is-invalid" : ""
									}`}
									{...register("image")}
								/>
								<label
									htmlFor="image"
									className={`label ${
										errors.image ? "invalid-label" : ""
									}`}>
									{" "}
									Upload Image:
								</label>
								{/* <div className="invalid-feedback">
									{errors.image?.message}
								</div> */}
							</div>
							<div className="form-floating mb-4">
								<input
									type="text"
									className={`form-control custom-input ${
										errors.image_url ? "is-invalid" : ""
									}`}
									{...register("image_url")}
								/>
								<label
									htmlFor="image_url"
									className={`label ${
										errors.image_url ? "invalid-label" : ""
									}`}>
									Image URL:
								</label>
								{/* <div className="invalid-feedback">
									{errors.image_url?.message}
								</div> */}
							</div>
							<button
								type="submit"
								className="btn btn-dark form-button">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
			<div ref={formRef2} className="vqna-form container mt-5">
				<div className="card">
					<div className="card-body text-center">
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
	);
};

export default VQnAForm;
