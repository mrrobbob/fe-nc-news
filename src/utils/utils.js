import moment from "moment"

export function formatDate (date) {
  return moment(date).format("Do MMM YYYY")
}