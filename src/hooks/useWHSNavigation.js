import { useState } from "react";

export const useWHSNavigation = () => {
  const [currentScreen, setCurrentScreen] = useState("overview");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const screens = [
    "overview",
    "act-regulations",
    "codes-practice",
    "incident-response",
    "compensation",
    "complaints-reporting",
  ];

  const navigateToScreen = (screenId, delay = 500) => {
    setIsTransitioning(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentScreen(screenId);
        setIsTransitioning(false);
        resolve();
      }, delay);
    });
  };

  const navigateNext = () => {
    const currentIndex = screens.indexOf(currentScreen);
    if (currentIndex < screens.length - 1) {
      navigateToScreen(screens[currentIndex + 1]);
    }
  };

  const navigatePrevious = () => {
    const currentIndex = screens.indexOf(currentScreen);
    if (currentIndex > 0) {
      navigateToScreen(screens[currentIndex - 1]);
    }
  };

  const navigateToOverview = () => {
    navigateToScreen("overview");
  };

  return {
    currentScreen,
    isTransitioning,
    navigateToScreen,
    navigateNext,
    navigatePrevious,
    navigateToOverview,
    screens,
  };
};
