export function convertHourStringToMinutes(hoursString : String)  {
    const [hours, minutes] = hoursString.split(':').map(Number)

    const minutesAnount = (hours * 60) + minutes;

    return minutesAnount
}