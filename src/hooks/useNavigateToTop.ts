import { NavigateOptions, To, useNavigate } from "react-router-dom";

export const useNavigateToTop = () => {
  const navigate = useNavigate();

  const navigateToTop = (to: To, options?: NavigateOptions) => {
    navigate(to, options);
    window.scrollTo(0, 0);
  };

  return navigateToTop;
};
