export const useLoader = () => useState("isLoader", () => true);
export const useSelectedAddress = () =>
  useState("selectedAddress", () => "");
export const useSelectedDay = () =>
  useState("selectedDay", () => "");
export const useSelectedRegion = () =>
  useState("selectedRegion", () => ({
    name: "Ташкент",
    value: "toshkent",
    coordinates: [41.2995, 69.2401],
  }));
export const useUserData = () =>
  useState("userData", () => ({
    name: "",
    surname: "",
    phone: "",
    payment: "",
  }));
