export const shortAddress = (address: string) =>
  address.substring(0, 4) +
  '...' +
  address.substring(address.length - 2, address.length);

export const mediumAddress = (address: string) =>
  address.substring(0, 8) +
  '...' +
  address.substring(address.length - 8, address.length);
