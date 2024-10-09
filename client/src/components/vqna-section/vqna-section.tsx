import { motion } from "framer-motion";
import Container from "@/components/container";
import SectionHeader from "@/components/section-header";
import ContentPadding from "@/components/content-padding";
import VqnaForm from "@/components/vqna-form";

const variants = {
  initial: {
    opacity: 0,
    x: 40,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

const transition = {
  type: "tween",
  duration: 0.4,
};

const viewport = {
  once: true,
  amount: "all" as const,
};

const VQnASection = () => {
  return (
    <section
      id="vqna"
      className="mb-10 overflow-x-hidden bg-dark py-12 md:mb-20 lg:mb-28 xl:mb-32 2xl:mb-36"
    >
      <Container>
        <div className="flex flex-col items-center justify-center gap-12">
          <SectionHeader titleText="Try VQnA" textTheme="light" />
          <ContentPadding>
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <motion.p
                variants={variants}
                transition={transition}
                viewport={viewport}
                initial="initial"
                whileInView="animate"
                className="w-full text-start font-poppins text-xl font-light text-white"
              >
                Try out our VQnA system to get answers to your questions. See
                our deep learning model in action for yourself and witness its
                accuracy and efficiency firsthand. Experience the power of our
                cutting-edge neural network model and enhance your understanding
                of its capabilities.
              </motion.p>
              <hr className="h-px w-full border-none bg-muted" />
              <VqnaForm />
            </div>
          </ContentPadding>
        </div>
      </Container>
    </section>
  );
};

export default VQnASection;
