import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import FormInput from "@/components/form-input";
import { useSubmitVQnAForm } from "@/api/services/predict";
import { formatAnswer } from "@/lib/helpers";

interface ResponseData {
  answer: string;
  answer_type: string;
  answerability: number | string;
}

interface Response {
  data: ResponseData;
}

const schema = z
  .object({
    question: z.string().min(1, { message: "Please enter a question." }),
    image_url: z
      .string()
      .url({ message: "Please enter a valid URL." })
      .optional()
      .or(z.literal("")),
    image: z
      .any()
      .optional()
      .refine(
        (data) => {
          if (data && data[0] && data[0].type) {
            return data[0].type.startsWith("image/");
          }
          return true;
        },
        { message: "The selected file must be an image." },
      ),
  })
  .refine(
    (data) => {
      return (
        (data.image !== undefined && data.image[0] !== undefined) ||
        (data.image_url !== "" && data.image_url !== undefined)
      );
    },
    {
      message: "You must provide either an image file or a valid image URL.",
      path: ["image"],
    },
  );

type schemaType = z.infer<typeof schema>;

const cardVariants = {
  initial: {
    opacity: 0,
    x: -40,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

const buttonVariants = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const cardTransition = {
  type: "tween",
  duration: 0.4,
  staggerChildren: 0.2,
};

const formTransition = {
  type: "tween",
  duration: 0.4,
};

const viewport = {
  once: true,
  amount: 0.3 as const,
};

const ContactForm = () => {
  const [response, setResponse] = useState<ResponseData | null>(null);
  const hasInteracted = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<schemaType>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const watchImageUrl = watch("image_url");
  const watchImage = watch("image");

  const { mutate, isPending } = useSubmitVQnAForm({
    onSuccess: (response) => {
      const { data } = response as Response;
      setResponse({
        answer: formatAnswer(data.answer),
        answer_type: formatAnswer(data.answer_type),
        answerability: formatAnswer(data.answerability as string, "percent"),
      });
    },
    onError: () => {
      setResponse({
        answer: "Something went wrong...",
        answer_type: "--",
        answerability: "--",
      });
    },
  });

  const formSubmitHandler = (data: schemaType) => {
    const formData = new FormData();

    formData.append("question", data.question);
    if (data.image) {
      formData.append("image", data.image[0]);
    } else if (data.image_url) {
      formData.append("image_url", data.image_url);
    }
    mutate(formData);
    reset();
  };

  useEffect(() => {
    // Only trigger validation after the form has been interacted with
    if (hasInteracted.current) {
      trigger(["image_url", "image"]);
    }
  }, [watchImageUrl, watchImage, trigger]);

  const markInteracted = () => (hasInteracted.current = true);

  const buttonDisabled = isPending || Object.keys(errors).length > 0;

  const answerText = isPending ? "Loading..." : response?.answer || "--";
  const answerTypeText = isPending
    ? "Loading..."
    : response?.answer_type || "--";
  const answerabilityText = isPending
    ? "Loading..."
    : response?.answerability || "--";

  return (
    <motion.div
      variants={cardVariants}
      transition={cardTransition}
      viewport={viewport}
      initial="initial"
      whileInView="animate"
      className="grid w-full grid-cols-1 gap-4 py-12 lg:grid-cols-2"
    >
      <motion.div
        variants={cardVariants}
        transition={cardTransition}
        className="flex flex-grow flex-col items-center justify-between gap-8 border-b-4 border-muted bg-white p-4 lg:items-start"
      >
        <h3 className="w-full text-start font-poppins text-[calc(1.375rem_+_1.5vw)] font-light leading-[1.2] text-dark xl:text-[2.5rem]">
          Ask a Question
        </h3>
        <form
          id="contact-form"
          method="POST"
          onSubmit={handleSubmit(formSubmitHandler)}
          className="mx-auto flex w-full flex-col gap-4"
          onFocus={markInteracted}
        >
          <FormInput
            label="Question"
            id="question"
            variant="input"
            type="text"
            error={errors?.question?.message as string | undefined}
            {...register("question")}
          />
          <FormInput
            label="Image"
            labelHidden
            id="image"
            variant="image-upload"
            error={errors.image?.message as string | undefined}
            {...register("image")}
            // Hack to show the file name when a file is selected
            placeholder={watchImage?.[0]?.name ?? "No file chosen"}
            disabled={watchImageUrl !== "" && watchImageUrl !== undefined}
          />
          <FormInput
            label="Image URL"
            id="image_url"
            variant="input"
            type="text"
            error={
              typeof errors.image_url?.message === "string"
                ? errors.image_url?.message
                : undefined
            }
            disabled={watchImage !== undefined && watchImage[0] !== undefined}
            {...register("image_url")}
          />

          <motion.button
            variants={buttonVariants}
            transition={formTransition}
            viewport={viewport}
            initial="initial"
            whileInView="animate"
            id="contact-form-button"
            type="submit"
            disabled={buttonDisabled}
            className="h-10 w-full rounded-none border-2 border-dark bg-dark font-poppins text-sm text-white transition-colors duration-200 ease-in-out hover:bg-white hover:text-dark disabled:cursor-not-allowed"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
      <motion.div
        variants={cardVariants}
        transition={cardTransition}
        className="flex w-full flex-col items-center justify-between gap-4 border-b-4 border-muted bg-white p-4"
      >
        <div className="flex flex-col items-center gap-3">
          <p className="text-center font-poppins text-xl font-light">Answer</p>
          <h3 className="text-center font-poppins text-[calc(1.375rem_+_1.5vw)] font-light leading-[1.2] text-dark xl:text-[2.5rem]">
            {answerText}
          </h3>
        </div>
        <div className="flex flex-col items-center gap-3">
          <p className="text-center font-poppins text-xl font-light">
            Answer Type
          </p>
          <h3 className="text-center font-poppins text-[calc(1.375rem_+_1.5vw)] font-light leading-[1.2] text-dark xl:text-[2.5rem]">
            {answerTypeText}
          </h3>
        </div>
        <div className="flex flex-col items-center gap-3">
          <p className="text-center font-poppins text-xl font-light">
            Answerability
          </p>
          <h3 className="text-center font-poppins text-[calc(1.375rem_+_1.5vw)] font-light leading-[1.2] text-dark xl:text-[2.5rem]">
            {answerabilityText}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
