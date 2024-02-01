export const getDateFromString = (datetime) => {
  const date = new Date(datetime)

  return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
}

export const getHourFromString = (datetime) => {
  const date = new Date(datetime)

  return date.getHours()+":"+date.getMinutes()
}

export const getDateAndHourFromString = (datetime) => {
  const date = new Date(datetime)

  return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() + " " + date.getHours()+":"+date.getMinutes() + "H"
}

export const getDateAndHourNow = () => {
  const date = new Date()

  return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() + " " + date.getHours()+":"+date.getMinutes() + "H"
}
