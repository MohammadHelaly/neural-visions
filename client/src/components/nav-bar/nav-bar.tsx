import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Container from "@/components/container";
import NavLinks from "@/components/nav-links";
import NavDrawer from "@/components/nav-drawer";
import { HamburgerMenu } from "@/assets/icons";

const navParentVariants = {
  initial: {
    opacity: 0,
  },
  animate: { opacity: 1 },
};

const navChildVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const transition = {
  type: "tween",
  duration: 0.2,
  staggerChildren: 0.1,
};

const viewport = {
  once: true,
  amount: "some" as const,
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navBarBackground, setNavBarBackground] = useState("bg-transparent");
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setNavBarBackground(latest > 100 ? "bg-dark" : "bg-transparent");
    });
    return () => unsubscribe();
  }, [scrollY]);

  const openDrawer = () => {
    setIsOpen(true);
  };

  return (
    <header
      className={
        "fixed top-0 z-50 w-full transition-colors duration-[400ms] " +
        navBarBackground
      }
    >
      <div className="w-full py-2 lg:py-3">
        <Container>
          <motion.div
            variants={navParentVariants}
            transition={transition}
            viewport={viewport}
            initial="initial"
            whileInView="animate"
            className="flex w-full items-center gap-2 lg:justify-end"
          >
            <motion.nav
              variants={navChildVariants}
              transition={transition}
              className="hidden lg:flex"
            >
              <ul className="flex">
                <NavLinks />
              </ul>
            </motion.nav>
            <motion.button
              variants={navChildVariants}
              transition={transition}
              className="flex h-10 w-14 items-center justify-center border border-muted bg-transparent px-3 shadow-none focus:outline-none lg:hidden"
              type="button"
              aria-label="Toggle navigation"
              onClick={openDrawer}
            >
              <HamburgerMenu className="h-full w-full fill-muted brightness-200" />
            </motion.button>
          </motion.div>
        </Container>
        <NavDrawer
          open={isOpen}
          onOpenChange={setIsOpen}
          background={navBarBackground}
        />
      </div>
    </header>
  );
};

export default NavBar;
