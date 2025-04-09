import React from "react";
import { EMarketBookingDetailStatus } from "../../services/interfaces/bookingDetail";
import StepProgress from "../payment/StepProgress";
import { getStatusTranslation } from "../../utils/statusTranslationMapping";
import { useTranslation } from "react-i18next";

const baseFlow: EMarketBookingDetailStatus[] = [
  "Requested",
  "Confirmed",
  "Processing",
  "Delivered",
];

function getFlow(status: EMarketBookingDetailStatus, language: string = "en") {
    let flow: EMarketBookingDetailStatus[] = [status];
  if (baseFlow.includes(status)) {
    flow = baseFlow;
  }
  if (status === "Denied") {
    flow = [baseFlow[0], status];
  }
  if (status === "Cancelled") {
    flow = [...baseFlow.slice(0, 2), status];
  }
  if (status === "Modified") {
    flow =  [...baseFlow.slice(0, 2), status, ...baseFlow.slice(2)];
  }
  return flow.map((s) => getStatusTranslation(s, language));
}

export const OrdersStatus = ({
  status,
}: {
  status: EMarketBookingDetailStatus;
}) => {
    const {i18n} = useTranslation();    
    
    return  <StepProgress styleType="minimal" step={getStatusTranslation(status, i18n.language)} steps={getFlow(status, i18n.language)}/>

};
