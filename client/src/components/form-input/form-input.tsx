import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExclamationCircle } from "@/assets/icons";

interface CommonProps {
  variant: "input" | "text-area" | "image-upload";
  label: string;
  error?: string;
  disabled?: boolean;
  labelHidden?: boolean;
}

type InputProps = CommonProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "ref">;
type TextareaProps = CommonProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "ref">;
type ImageUploadProps = CommonProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "ref" | "type">;

type Props = InputProps | TextareaProps | ImageUploadProps;

const inputVariants = {
  initial: {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
  },
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  },
};

const warningVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const inputTransition = {
  type: "tween",
  duration: 0.4,
};

const warningTransition = {
  type: "tween",
  duration: 0.2,
};

const viewport = {
  once: true,
  amount: "some" as const,
};

const FormInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  Props
>((props, ref) => {
  const { variant, label, error, id, disabled, labelHidden, value, ...rest } =
    props;

  let labelClasses = "absolute top-0 text-sm font-poppins";
  let inputClasses =
    "w-full pt-5 pb-3 rounded-none border-t-none border-x-none border-b-2 border-dark focus:outline-none focus:ring-0 !bg-white font-poppins text-sm text-dark placeholder:font-poppins placeholder:text-sm placeholder:text-muted";
  let fileInputClasses =
    "flex h-full w-full cursor-pointer border-b-2 border-dark bg-white px-0 pb-8 font-poppins text-sm text-gray";

  if (error) {
    labelClasses += " !text-red";
    inputClasses += " !border-red";
  } else {
    labelClasses += " text-gray";
  }

  if (labelHidden) {
    labelClasses += " sr-only";
  }

  const containerClasses = `relative w-full ${disabled ? "opacity-50" : ""}`;
  fileInputClasses += ` ${disabled ? "!cursor-not-allowed opacity-50" : ""}`;

  return (
    <motion.div
      variants={inputVariants}
      transition={inputTransition}
      viewport={viewport}
      initial="initial"
      whileInView="animate"
      className={containerClasses}
    >
      <label id={"label-" + id} htmlFor={id} className={labelClasses}>
        {label}
      </label>
      {variant === "text-area" ? (
        <textarea
          id={id}
          aria-labelledby={"label-" + id}
          className={inputClasses}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          disabled={disabled}
          {...(rest as TextareaProps)}
        ></textarea>
      ) : variant === "image-upload" ? (
        <motion.div transition={inputTransition}>
          <label htmlFor={id} className={fileInputClasses}>
            Image
          </label>
          <input
            id={id}
            aria-labelledby={"label-" + id}
            className="hidden"
            ref={ref as React.Ref<HTMLInputElement>}
            type="file"
            accept="image/*"
            disabled={disabled}
            {...(rest as ImageUploadProps)}
          />

          <span className="absolute bottom-3 left-0 truncate text-sm text-muted">
            {/* Hack to show the file name when a file is selected */}
            {rest.placeholder}
          </span>
        </motion.div>
      ) : (
        <input
          id={id}
          aria-labelledby={"label-" + id}
          className={inputClasses}
          ref={ref as React.Ref<HTMLInputElement>}
          disabled={disabled}
          {...(rest as InputProps)}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.div
            variants={warningVariants}
            transition={warningTransition}
            initial="initial"
            animate="animate"
            exit="initial"
            className="absolute right-0 top-0 flex items-center justify-center"
            aria-live="assertive"
            aria-describedby={`${id}-error`}
          >
            <ExclamationCircle className="h-5 w-5 fill-red" />
            <span id={`${id}-error`} className="sr-only">
              {error}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default FormInput;
