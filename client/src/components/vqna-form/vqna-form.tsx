import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import FormInput from "@/components/form-input";
import VQnAFormResponseItem from "@/components/vqna-form-response-item";
import Notification from "@/components/notification";
import { useSubmitVQnAForm } from "@/api/services/predict";
import { formatAnswer } from "@/lib/helpers";
import { useOnlineStatus } from "@/lib/hooks/web";

type Prediction = {
  answer: string;
  answerType: string;
  answerability: string;
};

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

const buttonTransition = {
  type: "tween",
  duration: 0.4,
};

const viewport = {
  once: true,
  amount: 0.3 as const,
};

const VQnAForm = () => {
  const [prediction, setPrediction] = useState<Prediction | undefined>(
    undefined,
  );
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [image, setImage] = useState<FileList | undefined>();
  const [notification, setNotification] = useState<{
    open: boolean;
    text: string;
    variant: "info" | "success" | "warning" | "error";
  }>({ open: false, text: "", variant: "info" });

  const { isOnline } = useOnlineStatus();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<schemaType>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    // Autofill can have strange behavior when defaultValues are not set
    defaultValues: {
      question: "",
      image_url: "",
      image: undefined,
    },
  });

  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    data: response,
  } = useSubmitVQnAForm();

  const formSubmitHandler = (data: schemaType) => {
    if (!isOnline) {
      setNotification({
        open: true,
        text: "You are offline. Please check your connection and try again.",
        variant: "warning",
      });
      return;
    }

    const formData = new FormData();

    formData.append("question", data.question);
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    } else if (data.image_url) {
      formData.append("image_url", data.image_url);
    }
    mutate(formData);
  };

  const buttonDisabled = isPending || Object.keys(errors).length > 0;

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      setImageUrl(value.image_url);
      setImage(value.image);
    });

    return () => unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!isSuccess) return;

    setPrediction({
      answer: formatAnswer(response.data.data.answer),
      answerType: formatAnswer(response.data.data.answer_type),
      answerability: formatAnswer(response.data.data.answerability, "percent"),
    });

    reset();
  }, [isSuccess, response, reset]);

  useEffect(() => {
    if (!isError) return;

    setNotification({
      open: true,
      text: "Something went wrong while submitting the form. Please try again.",
      variant: "error",
    });

    setPrediction(undefined);
  }, [isError]);

  useEffect(() => {
    if (!isPending) return;

    setPrediction(undefined);
  }, [isPending]);

  return (
    <>
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
              placeholder={image?.[0]?.name ?? "No file chosen"}
              disabled={imageUrl !== "" && imageUrl !== undefined}
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
              disabled={image !== undefined && image[0] !== undefined}
              {...register("image_url")}
            />
            <motion.button
              variants={buttonVariants}
              transition={buttonTransition}
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
          <VQnAFormResponseItem
            label="Answer"
            isLoading={isPending}
            data={prediction?.answer ?? "--"}
          />
          <VQnAFormResponseItem
            label="Answer Type"
            isLoading={isPending}
            data={prediction?.answerType ?? "--"}
          />
          <VQnAFormResponseItem
            label="Answerability"
            isLoading={isPending}
            data={prediction?.answerability ?? "--"}
          />
        </motion.div>
      </motion.div>
      <Notification
        open={notification.open}
        onOpenChange={(open) => setNotification((prev) => ({ ...prev, open }))}
        text={notification.text}
        variant={notification.variant}
      />
    </>
  );
};

export default VQnAForm;
