import {
  AgencyClientBooking,
  BookingDetail,
  MarketBookingDetail,
} from "../services/interfaces/bookingDetail";

export interface UIBooking extends AgencyClientBooking {
  details: UIBookingDetail[];
}

export interface UIBookingDetail extends BookingDetail {
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
}
export const mapAgencyClientBookingsToUIBookings = (
  booking: AgencyClientBooking
): UIBooking => {
  let uiBookingDetails: UIBookingDetail[] = [];
  if (booking.details) {
    switch (booking.details[0].bookingType) {
      case "Market":
        uiBookingDetails = mapBookingDetailsToUIBookingDetails(
          booking.details as MarketBookingDetail[]
        );
        break;
      default:
        uiBookingDetails = booking.details.map((detail, index) => {
          return {
            ...detail,
            index: index,
            total: booking.details?.length || 0,
            items: [],
          };
        });
        break;
    }
  }

  return {
    ...booking,
    details: uiBookingDetails,
  };
};

const mapBookingDetailsToUIBookingDetails = (
  details: MarketBookingDetail[]
): UIBookingDetail[] => {
  return details.map((detail, index) => {
    let items = detail.productDetails?.map((productDetail) => {
      let id = productDetail.id || 0;
      let name = productDetail.product.name || "N/A";
      let quantity = productDetail.quantity || 1;
      let price = productDetail.price || 0;
      return { id, name, quantity, price };
    });

    return {
      ...detail,
      index: index,
      total: details.length,
      items: items || [],
    };
  });
};
