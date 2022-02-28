import check from "./check"

const ATTENDANCE_CHECK_DELAY = 1000// * 3600 // every hour
let attendance_is_checked = false

let now

export default () => {
  // check attendance every ${attendance_check_delay} moment
  setInterval(() => {
    now = new Date() // set current time


    // if current time is 9PM - 3AM && !attendance_is_checked
    // if (now.getHours()>=21 && now.getHours()<3 && !attendance_is_checked) {
    if (now.getSeconds()%10==0)
      check(now)
    //   attendance_is_checked = true
    // } else if (now.getHours()<21 && now.getHours()>=3 && attendance_is_checked)
    //   attendance_is_checked = false
    
  }, ATTENDANCE_CHECK_DELAY)
}