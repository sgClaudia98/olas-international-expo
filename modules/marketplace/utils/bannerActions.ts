import { Router } from "expo-router";
import { BannerAction } from "../services/interfaces/booking";

interface BannerMetadata {
  departmentId: number;
}

interface SetSelectionFn {
  (selection: { departmentId?: number; categoryId?: number }): void;
}

/**
 * Handles banner click actions based on the action name
 * @param action - The banner action object with name and parameters
 * @param metadata - Additional metadata like departmentId from the banner's department
 * @param setSelection - Function to update the search context selection
 */
export const handleBannerAction = (
  action: BannerAction,
  metadata: BannerMetadata,
  setSelection: SetSelectionFn
) => {
  console.log("Banner action:", action);
  switch (action.name) {
    case "GOTO_DEPARTMENT": {
      // Use departmentId from action parameters or fallback to metadata
      const departmentId = action.parameters?.departmentId ?? metadata.departmentId;

      if (!departmentId) {
        console.warn("GOTO_DEPARTMENT action requires departmentId");
        return;
      }

      setSelection({ departmentId });
      break;
    }

    case "GOTO_CATEGORY": {
      const departmentId = action.parameters?.departmentId ?? metadata.departmentId;
      const categoryId = action.parameters?.categoryId;

      if (!departmentId || !categoryId) {
        console.warn("GOTO_CATEGORY action requires departmentId and categoryId");
        return;
      }

      setSelection({ departmentId, categoryId });
      break;
    }

    default:
      console.warn(`Unsupported banner action: ${action.name}`);
  }
};
