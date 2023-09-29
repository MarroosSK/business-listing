export interface BusinessDataI {
  name: string;
  image_url: string;
  display_phone: string;
  rating: number;
  photos: string[];
  coordinates: {
    latitude: string;
    longitude: string;
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
