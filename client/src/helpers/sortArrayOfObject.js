export const sortByAlphabet = (data, by) => {
  return data?.slice()?.sort(function (a, b) {
    if (a[by]?.toLowerCase() < b[by]?.toLowerCase()) {
      return -1;
    }
    if (a[by]?.toLowerCase() > b[by]?.toLowerCase()) {
      return 1;
    }
    return 0;
  });
};

export const sortByNumber = (data, by, asc = true) => {
  if (asc) {
    return data?.slice()?.sort(function (a, b) {
      if (a[by] < b[by]) {
        return -1;
      }
      if (a[by] > b[by]) {
        return 1;
      }
      return 0;
    });
  } else {
    return data?.slice()?.sort(function (a, b) {
      if (a[by] > b[by]) {
        return -1;
      }
      if (a[by] < b[by]) {
        return 1;
      }
      return 0;
    });
  }
};
