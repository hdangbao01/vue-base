import router from "@/router"

// Toast function
function toast({ title = "Thông báo", message = "", type = "info", duration = 3000, url = ''  }) {
    const main = document.getElementById("toast")
    if (main) {
        const toast = document.createElement("div")

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast)
        }, duration + 1000)

        // Remove toast when clicked
        toast.onclick = function (e) {
            if (url) {
                router.push(url)
            }
            // if (e.target.closest(".toast__close")) {
                main.removeChild(toast)
                clearTimeout(autoRemoveId)
            // }
        };

        const icons = {
            success: "success",
            info: "info",
            warning: "warning",
            error: "error"
        };
        const icon = icons[type]
        const delay = (duration / 1000).toFixed(2)

        toast.classList.add("toast", `toast--${type}`)
        toast.style.animation = `slideInLeftToast ease .3s, fadeOutToast linear 1s ${delay}s forwards`

        toast.innerHTML = `
                        <div class="toast__icon">
                          <img src="/toast/${icon}.svg" />
                        </div>
                        <div class="toast__body">
                            <h3 class="toast__title">${title}</h3>
                            <p class="toast__msg">${message}</p>
                        </div>
                        <div class="toast__close">
                          <img src="/toast/close.svg" />
                        </div>
                    `
        main.appendChild(toast)
    }
}

export default toast
