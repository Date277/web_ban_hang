export const formatCurrency = (price:any) => {
  price = price.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  return price;
};
