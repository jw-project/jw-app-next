import axios from "axios";

import { useTheme } from "~/hooks/use-theme";

import { Icon } from "../commons/icon";
import { Tooltip } from "../commons/tooltip";

export function ChangeTheme() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const changeHandle = async () => {
    const newTheme = toggleTheme();
    try {
      await axios.post("/api/save-theme", { theme: newTheme });
    } catch (error) {}
  };

  return (
    <Tooltip message="Mudar o tema">
      <Icon
        icon={isDark ? "dark_mode" : "light_mode"}
        onClick={changeHandle}
        className={isDark ? "dark:text-white" : "text-black"}
      />
    </Tooltip>
  );
}
