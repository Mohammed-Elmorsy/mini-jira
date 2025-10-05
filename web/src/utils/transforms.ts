export const transformToISOString = (date: string): string => {
  return new Date(date).toISOString()
}

export const transformToDatePickerFormat = (date: string): string => {
  return new Date(date).toISOString().split('T')[0]
}
