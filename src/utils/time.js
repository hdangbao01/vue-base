export function getCurrentHours(time) {
    const date = new Date(time)

    const hour = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${hour}:${minutes}`
}

export function getCurrentDayTime(time) {
    const date = new Date(time)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${day}-${month}-${year}`
}

export function getTimeBefore(time) {
    const date = new Date(time)
    const currentTime = new Date()

    const timeDifference = currentTime - date;
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60))
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    const monthsDifference = Math.floor(daysDifference / 30)
    const yearsDifference = Math.floor(daysDifference / 365)

    if (yearsDifference > 0) {
        return `${yearsDifference} năm trước`;
    } else if (monthsDifference > 0) {
        return `${monthsDifference} tháng trước`;
    } else if (daysDifference > 0) { 
        return `${daysDifference} ngày trước`
    } else if (hoursDifference > 0) {
        return `${hoursDifference} giờ trước`
    } else if (minutesDifference >= 0) {
        return `${minutesDifference} phút trước`
    }
}