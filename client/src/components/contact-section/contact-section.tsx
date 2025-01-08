import { motion } from "framer-motion";
import Container from "@/components/container";
import SectionHeader from "@/components/section-header";
import ContentPadding from "@/components/content-padding";

const contentVariants = {
  initial: {
    opacity: 0,
    x: 40,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

const disclaimerVariants = {
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
};

const viewport = {
  once: true,
  amount: "all" as const,
};

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="mb-10 overflow-x-hidden bg-dark py-12 md:mb-20 lg:mb-28 xl:mb-32 2xl:mb-36"
    >
      <Container>
        <div className="flex flex-col items-center justify-center gap-12">
          <SectionHeader
            titleText="Contact Us"
            subtitleText="Get in touch with the team behind NeuralVisions."
            textTheme="light"
          />
          <ContentPadding>
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <motion.p
                variants={contentVariants}
                transition={transition}
                viewport={viewport}
                initial="initial"
                whileInView="animate"
                className="w-full text-start font-poppins text-xl font-light text-white"
              >
                We are a group of passionate computer engineering students from
                Alexandria University who have a strong passion for deep
                learning and artificial intelligence. We developed NeuralVisions
                as part of our Pattern Recognition course project. Our goal is
                to contribute our skills and knowledge while inspiring others'
                interest in the field.
              </motion.p>
              <hr className="h-px w-full border-none bg-muted" />
              <motion.h4
                variants={disclaimerVariants}
                transition={transition}
                viewport={viewport}
                initial="initial"
                whileInView="animate"
                className="py-6 font-poppins text-[calc(1.375rem_+_1.5vw)] font-light leading-[1.2] text-white xl:text-[2.5rem]"
              >
                Coming Soon...
              </motion.h4>
            </div>
          </ContentPadding>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
