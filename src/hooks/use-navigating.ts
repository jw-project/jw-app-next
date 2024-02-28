import { useContext } from "react";
import { NavigatingContext } from "~/global-context/navigating";

export const useNavigating = () => useContext(NavigatingContext);
