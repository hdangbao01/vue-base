export default function formatPrice(price) {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}