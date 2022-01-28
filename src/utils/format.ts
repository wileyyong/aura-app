import { commify } from "@ethersproject/units";

/**
 * @name format
 * @description Takes in a string or number value and either returns K-formatted or with commas
 *
 * @param {string|number} number
 * @param {number} decimals
 */
export function format(num: string | number, digits: number) {
  num = Number(num.toString());

  if (num && num < 10000) {
    return commify(num.toFixed(digits).toString());
  }

  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });

  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

