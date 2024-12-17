function processBar(process = 0) {
    const main = document.getElementById("process")
    main.style.height = '3px'

    if (main) {
        if (process == 100) {
            setTimeout(function () {
                main.style.height = '0px'
                main.style.width = '0%'
            }, 1000)
        }       
        main.style.width = process + '%'
    }
}

export default processBar
