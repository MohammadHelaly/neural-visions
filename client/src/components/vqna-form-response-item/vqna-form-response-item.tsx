import { motion, AnimatePresence } from "framer-motion";

interface Props {
  label: string;
  isLoading: boolean;
  data?: string;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const transition = {
  duration: 0.2,
};

const VQnAFormResponseItem = (props: Props) => {
  const { label, isLoading, data = "--" } = props;

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-center font-poppins text-xl font-light">{label}</p>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.h3
            key="loading"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition}
            className="text-center font-poppins text-[calc(1.375rem_+_1.5vw)] font-light leading-[1.2] text-dark xl:text-[2.5rem]"
          >
            Loading...
          </motion.h3>
        ) : (
          <motion.h3
            key={data}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition}
            className="text-center font-poppins text-[calc(1.375rem_+_1.5vw)] font-light leading-[1.2] text-dark xl:text-[2.5rem]"
          >
            {data}
          </motion.h3>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VQnAFormResponseItem;
