import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { CloseMenu } from "@/assets/icons";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  text: string;
  variant: "info" | "success" | "error" | "warning";
}

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const transition = {
  type: "tween",
  duration: 0.4,
};

const Notification = (props: Props) => {
  const { open, onOpenChange, text, variant } = props;

  let contentClasses =
    "fixed z-50 bottom-8 left-1/2 -ml-40 lg:ml-auto lg:left-auto lg:right-8 w-80 bg-white shadow-[0_0_36px_#00000026] border-b-2";
  let textClasses = "font-poppins font-normal text-sm";

  switch (variant) {
    case "success":
      contentClasses += " border-green";
      textClasses += " text-green";
      break;
    case "error":
      contentClasses += " border-red";
      textClasses += " text-red";
      break;
    case "warning":
      contentClasses += " border-orange";
      textClasses += " text-orange";
      break;
    case "info":
    default:
      contentClasses += " border-muted";
      textClasses += " text-dark";
      break;
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content asChild forceMount>
              <motion.div
                variants={variants}
                transition={transition}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={contentClasses}
              >
                <Dialog.Title asChild>
                  <div className="flex w-full items-center justify-end p-3">
                    <Dialog.Close asChild>
                      <button
                        className="size-4 items-center justify-center border-none bg-transparent p-0"
                        type="button"
                        aria-label="Close dialog"
                      >
                        <CloseMenu className="h-full w-full fill-dark" />
                      </button>
                    </Dialog.Close>
                  </div>
                </Dialog.Title>
                <Dialog.Description asChild>
                  <div className="p-6 pt-0">
                    <p className={textClasses}>{text}</p>
                  </div>
                </Dialog.Description>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default Notification;
