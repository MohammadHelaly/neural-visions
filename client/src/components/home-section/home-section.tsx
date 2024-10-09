import { motion } from "framer-motion";
import Container from "@/components/container";
import Links from "@/components/links";

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const transition = {
  type: "tween",
  duration: 0.4,
  delayChildren: 0.2,
  staggerChildren: 0.2,
};

const viewport = {
  once: true,
  amount: "some" as const,
};

const HomeSection = () => {
  return (
    <section id="home" className="h-screen bg-transparent py-12 lg:pt-28">
      <Container className="h-full">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <motion.div
            variants={variants}
            transition={transition}
            viewport={viewport}
            initial="initial"
            whileInView="animate"
            className="flex h-full w-full flex-col items-center justify-center gap-4 md:gap-2 lg:items-start lg:px-9"
          >
            <motion.div
              variants={variants}
              transition={transition}
              className="flex w-full flex-col items-center justify-center gap-4 md:gap-2 lg:items-start"
            >
              <h1 className="text-start font-poppins text-[calc(1.625rem_+_4.5vw)] font-light leading-[1.2] text-white xl:text-[5rem]">
                NeuralVisions
              </h1>
              <div className="flex w-full flex-col items-center justify-center gap-4 lg:items-start">
                <p className="text-start font-poppins text-xl font-light text-white">
                  VisualQnA
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={variants}
              transition={transition}
              className="py-4"
            >
              <Links variant="light" />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HomeSection;
