export function searchingData(search) {
  return function (x) {
    return (
      x.name.toLowerCase().includes(search) ||
      x.name.toUpperCase().includes(search) ||
      x.lastName.toLowerCase().includes(search) ||
      x.lastName.toUpperCase().includes(search) ||
      x.ownReferal.toLowerCase().includes(search) ||
      x.ownReferal.toUpperCase().includes(search) ||
      x.email.toLowerCase().includes(search) ||
      x.email.toUpperCase().includes(search) ||
      !search
    );
  };
}

export function searchingBusinessData(search) {
  return function (x) {
    return x.name.toLowerCase().includes(search) || x.name.toUpperCase().includes(search) || !search;
  };
}

export function searchingProducts(search) {
  return function (x) {
    return x.name.toLowerCase().includes(search) || x.name.toUpperCase().includes(search) || !search;
  };
}

export function searchingProductsByNameOrCategory(search) {
  return function (x) {
    return (
      x.name.toLowerCase().includes(search) ||
      x.name.toUpperCase().includes(search) ||
      x.category.toLowerCase().includes(search) ||
      x.category.toUpperCase().includes(search) ||
      !search
    );
  };
}
