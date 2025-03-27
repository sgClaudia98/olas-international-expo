import {
  AgencyClientBooking,
  BookingDetail,
  MarketBookingDetail,
} from "../services/interfaces/bookingDetail";

export interface UIBooking extends AgencyClientBooking {
  details: UIBookingDetail[];
  total: number;
}

export interface UIBookingDetail extends BookingDetail {
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
  index: number;
  total: number;
}
export const mapAgencyClientBookingsToUIBookings = (
  booking: AgencyClientBooking
): UIBooking => {
  let uiBookingDetails: UIBookingDetail[] = [];
  let _total: number = 0;
  if (booking.details) {
    switch (booking.details[0].bookingType) {
      case "Market":
        const { details, total } = mapBookingDetailsToUIBookingDetails(
          booking.details as MarketBookingDetail[]
        );
        uiBookingDetails = details;
        _total = total;
        break;
      default:
        uiBookingDetails = booking.details.map((detail, index) => {
          _total += booking.details?.length || 0;
          return {
            ...detail,
            index: index,
            total: booking.details?.length || 0,
            items: [],
          } as UIBookingDetail;
        });
        break;
    }
  }

  return {
    ...booking,
    details: uiBookingDetails,
    total: _total,
  };
};

const mapBookingDetailsToUIBookingDetails = (
  details: MarketBookingDetail[]
): { details: UIBookingDetail[]; total: number } => {
  let total = 0;
  const items = details.map((detail, index) => {
    let items = detail.productDetails?.map((productDetail) => {
      let id = productDetail.id || 0;
      let name = productDetail.product.name || "N/A";
      let quantity = productDetail.quantity || 1;
      let price = productDetail.price || 0;
      return { id, name, quantity, price };
    });
    total += detail.productDetails.length;
    return {
      ...detail,
      index: index,
      total: details.length,
      items: items || [],
    };
  });
  return { details: items, total };
};
