export interface BusinessDataI {
  id: string;
  url: string;
  name: string;
  image_url: string;
  display_phone: string;
  rating: number;
  is_closed: boolean;
  photos: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  hours: [
    {
      is_open_now: boolean;
      open: [
        {
          start: number;
          end: number;
          day: number;
        }
      ];
    }
  ];
  location: {
    address1: string;
    country: string;
    city: string;
    zip_code: string;
    display_address: string[];
  };
}
export interface ReviewsDataI {
  reviews: [
    {
      rating: number;
      text: string;
      url: string;
      time_created: string;
      user: {
        image_url: string;
        name: string;
      };
    }
  ];
}
