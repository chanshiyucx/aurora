const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// 2018-11-11T07:53:15.403Z => 2018-11-11 15:53:15
export const formatJSONDate = (jsonDate: string): string => {
  return new Date(+new Date(new Date(jsonDate).toJSON()) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
};

// 2018-11-11 15:53:15 => November 11, 2018
export const formatCommonDate = (date: string): string => {
  const dataList = date.split(" ")[0].split("-");
  return `${months[parseInt(dataList[1], 10) - 1]} ${dataList[2]}, ${
    dataList[0]
  }`;
};
