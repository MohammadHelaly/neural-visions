import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Container from "@/components/container";
import NavLinks from "@/components/nav-links";
import NavDrawer from "@/components/nav-drawer";
import { HamburgerMenu } from "@/assets/icons";

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
            variants={variants}
            transition={transition}
            viewport={viewport}
            initial="initial"
            whileInView="animate"
            className="flex w-full items-center gap-2 lg:justify-end"
          >
            <motion.nav variants={variants} transition={transition}>
              <ul className="hidden lg:flex">
                <NavLinks />
              </ul>
              <button
                className="flex h-10 w-14 items-center justify-center border border-muted bg-transparent px-3 shadow-none lg:hidden"
                type="button"
                aria-label="Toggle navigation"
                onClick={openDrawer}
              >
                <HamburgerMenu className="h-full w-full fill-muted brightness-200" />
              </button>
            </motion.nav>
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
