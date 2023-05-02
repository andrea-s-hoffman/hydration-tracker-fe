export const getPercent = (numberAsString: number, goal: number): string => {
  let percent = (numberAsString / goal) * 100;
  if (percent >= 100) {
    return "100%";
  } else {
    return percent + "%";
  }
};
