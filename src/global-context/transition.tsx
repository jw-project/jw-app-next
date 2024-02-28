import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { useNavigating } from "~/hooks/use-navigating";

export const TransitionContext = createContext<{
  show: boolean;
  toggleTransition: () => void;
}>({
  show: true,
  toggleTransition: () => {},
});

export const TransitionProvider = ({ children }: PropsWithChildren) => {
  const [show, setShow] = useState(true);
  const { loading } = useNavigating();

  useEffect(() => {
    setShow(loading);
  }, [loading]);

  const toggleTransition = () => {
    setShow((current) => !current);
  };

  return (
    <TransitionContext.Provider value={{ show, toggleTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};
