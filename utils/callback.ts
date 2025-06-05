import { DOMAIN } from "@/constants";

// config.js
export const getCallbackUrl = (absolutePath: string) => {
    return `${DOMAIN}/${absolutePath}`;
};
