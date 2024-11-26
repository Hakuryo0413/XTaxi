import resolveConfig from "tailwindcss/resolveConfig";
import customConfig from "../../tailwind.config";

const config = resolveConfig(customConfig);

export const COLOR = config.COLOR;
