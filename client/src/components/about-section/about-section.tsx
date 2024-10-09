import { motion } from "framer-motion";
import Container from "@/components/container";
import ContentPadding from "@/components/content-padding";
import SectionHeader from "@/components/section-header";
import { LinkArrow } from "@/assets/icons";

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
  delay: 0.4,
};

const viewport = {
  once: true,
  amount: "some" as const,
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="mb-10 bg-dark py-12 md:mb-20 lg:mb-28 xl:mb-32 2xl:mb-36"
    >
      <Container>
        <div className="flex flex-col items-center justify-center gap-12">
          <SectionHeader
            titleText="About VQnA"
            subtitleText="Read about visual question answering."
            textTheme="light"
          />
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                euismod libero non libero euismod, in feugiat purus lacinia. In
                hac habitasse platea dictumst. Suspendisse potenti. Aenean
                commodo, libero et tristique suscipit, neque odio vulputate est,
                nec malesuada libero ante id purus.
                <br />
                <br />
                Duis laoreet risus et nibh varius, ut feugiat ante egestas.
                Suspendisse dapibus in elit vel hendrerit. Nunc ac purus in dui
                ultrices varius a quis eros. Pellentesque vitae orci eget purus
                blandit rhoncus non sed quam. Cras bibendum tincidunt dolor, in
                ultrices ligula dictum eu. Aliquam semper libero a ex lacinia,
                ac venenatis dolor tincidunt.
                <br />
                <br />
                Quisque a quam ut dolor venenatis rhoncus ut et metus. Nulla vel
                purus in est fermentum consequat a ac justo. Nulla facilisi. Sed
                viverra, lectus eget malesuada bibendum, lectus est vulputate
                nisi, eget efficitur arcu purus id ante. Curabitur feugiat
                hendrerit metus, vel congue libero cursus eget. Quisque egestas
                dictum mauris, ac sollicitudin orci hendrerit sed. In euismod,
                arcu a egestas rhoncus, felis ex suscipit quam, id lacinia justo
                nulla ac quam. Fusce et mi nec lorem imperdiet semper id id
                arcu. Vivamus eleifend quam eu arcu eleifend, non congue ex
                eleifend. Nulla facilisi.
                <br />
                <br />
                Integer scelerisque nisl nec malesuada rhoncus. In hac habitasse
                platea dictumst. Nam gravida volutpat ante, at dictum ante
                laoreet a. Nullam id dolor non sapien luctus auctor. Integer
                lacinia nulla at lectus scelerisque, id vulputate tortor
                facilisis. Fusce vehicula sem eget varius rhoncus. Nullam a sem
                ut justo gravida finibus vel ac libero.
                <br />
                <br />
                Etiam lacinia libero vel nulla tincidunt efficitur. Duis egestas
                tortor quis lacus tristique, id auctor felis dignissim. Sed
                sagittis interdum nunc vel faucibus. Integer vulputate quam ac
                odio ultricies, ac euismod libero vestibulum. Curabitur vel dui
                ut libero commodo tincidunt nec sed erat. Sed varius aliquam
                elit ut facilisis. Quisque ac ligula eu turpis consectetur
                pellentesque.
                <br />
                <br />
                Praesent placerat purus id ipsum consectetur, nec hendrerit elit
                tristique. Suspendisse sed purus feugiat, tristique ante eu,
                venenatis ipsum. Donec vel metus vel justo placerat viverra.
                Nulla id nisl venenatis, ultrices ante quis, suscipit justo.
                <br />
                <br />
                Donec faucibus dapibus metus, id ultrices neque bibendum at. Sed
                vel nisi auctor, tincidunt dui non, consectetur quam. Nullam
                aliquam, nisi ut venenatis tristique, nisi dolor venenatis mi,
                vel malesuada risus justo nec purus. Etiam venenatis dui in urna
                bibendum, a fringilla quam facilisis. Nullam nec mi nec eros
                dapibus gravida. Ut egestas odio a arcu fermentum, in dictum
                metus fermentum. Donec cursus tortor id leo vehicula, ut euismod
                odio bibendum. In quis tincidunt nisi.
                <br />
                <br />
                Ut vulputate felis sit amet sapien laoreet, et viverra libero
                gravida. Quisque interdum, risus id dignissim pharetra, purus
                nisl tempus neque, a auctor est ex nec quam. Sed viverra ex vel
                efficitur.
              </motion.p>
              <hr className="h-px w-full border-none bg-muted" />
              <motion.div
                variants={variants}
                transition={transition}
                viewport={viewport}
                initial="initial"
                whileInView="animate"
                className="grid w-full grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-3 lg:gap-2"
              >
                <a
                  target="_blank"
                  href="/assets/files/Pattern Recognition - Visual Question Answering.pdf"
                  className="flex items-center justify-start gap-1 text-start font-poppins text-base font-light text-white underline lg:justify-center lg:text-center"
                >
                  Read our paper
                  <LinkArrow className="size-4 min-w-4 fill-white" />
                </a>
                <a
                  target="_blank"
                  href="https://www.kaggle.com/code/mohammadhelaly/visual-question-answering"
                  className="flex items-center justify-start gap-1 text-start font-poppins text-base font-light text-white underline lg:justify-center lg:text-center"
                >
                  View our code
                  <LinkArrow className="size-4 min-w-4 fill-white" />
                </a>
                <a
                  target="_blank"
                  href="https://openai.com/index/clip/"
                  className="flex items-center justify-start gap-1 text-start font-poppins text-base font-light text-white underline lg:justify-center lg:text-center"
                >
                  Read about CLIP
                  <LinkArrow className="size-4 min-w-4 fill-white" />
                </a>
                <a
                  target="_blank"
                  href="https://www.researchgate.net/publication/361274338_Less_Is_More_Linear_Layers_on_CLIP_Features_as_Powerful_VizWiz_Model"
                  className="flex items-center justify-start gap-1 text-start font-poppins text-base font-light text-white underline lg:justify-center lg:text-center"
                >
                  Read "Less is More"
                  <LinkArrow className="size-4 min-w-4 fill-white" />
                </a>
                <a
                  target="_blank"
                  href="https://huggingface.co/spaces/CVPR/VizWiz-CLIP-VQA/tree/main"
                  className="flex items-center justify-start gap-1 text-start font-poppins text-base font-light text-white underline lg:justify-center lg:text-center"
                >
                  View the code for "Less is More"
                  <LinkArrow className="size-4 min-w-4 fill-white" />
                </a>
                <a
                  target="_blank"
                  href="https://vizwiz.org/tasks-and-datasets/vqa/"
                  className="flex items-center justify-start gap-1 text-start font-poppins text-base font-light text-white underline lg:justify-center lg:text-center"
                >
                  Read about VizWiz VQA
                  <LinkArrow className="size-4 min-w-4 fill-white" />
                </a>
              </motion.div>
            </div>
          </ContentPadding>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
