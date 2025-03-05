import { useState, useEffect } from "react";
import NavBar from "@/components/nav-bar";
import Background from "@/components/background";
import HomeSection from "@/components/home-section";
import VQnASection from "@/components/vqna-section";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Notification from "@/components/notification";

const App = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const showNotificationTimeout = setTimeout(() => {
      setNotificationOpen(true);
    }, 2000);

    const hideNotificationTimeout = setTimeout(() => {
      setNotificationOpen(false);
    }, 7000); // 2 seconds delay + 5 seconds display time

    return () => {
      clearTimeout(showNotificationTimeout);
      clearTimeout(hideNotificationTimeout);
    };
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <Background />
        <HomeSection />
        <VQnASection />
        <AboutSection />
        <ContactSection />
        <Notification
          text="This web app is still under development. Some features may not be available yet."
          variant="info"
          open={notificationOpen}
          onOpenChange={setNotificationOpen}
        />
      </main>
      <Footer />
    </>
  );
};

export default App;
