import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import NavLinks from "@/components/nav-links";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  background: string;
}

const variants = {
  hidden: {
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
  },
  visible: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  },
};

const transition = {
  type: "tween",
  duration: 0.2,
};

const NavDrawer = (props: Props) => {
  const { open, onOpenChange, background } = props;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content asChild forceMount>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={variants}
                transition={transition}
                className={
                  "fixed top-14 w-full transition-colors duration-[400ms] lg:hidden " +
                  background
                }
              >
                <VisuallyHidden>
                  <Dialog.Title asChild>
                    <span className="sr-only hidden">Navigation Menu</span>
                  </Dialog.Title>
                </VisuallyHidden>
                <Dialog.Description asChild>
                  <nav>
                    <ul className="flex flex-col items-center gap-2 p-3 pt-0">
                      <NavLinks />
                    </ul>
                  </nav>
                </Dialog.Description>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default NavDrawer;
