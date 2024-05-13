const convertWeight = (weight) => {
  const result = weight >= 1000 ? `${weight / 1000} кг` : `${weight} г`
  return result
}

export default convertWeight
