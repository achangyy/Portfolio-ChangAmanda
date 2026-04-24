const alreadyLoaded = sessionStorage.getItem("loaderShown");

if (alreadyLoaded) {
    document.addEventListener("DOMContentLoaded", () => {
        const loader = document.getElementById("loader");
        const content = document.getElementById("page-content");

        if (loader) loader.style.display = "none";
        if (content) {
            content.style.display = "block";
            content.classList.add("loaded");
        }
    });
}

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");
    const content = document.getElementById("page-content");

    if (!loader || !content) return;

    // skip loader if already shown in this tab
    if (sessionStorage.getItem("loaderShown")) {
        loader.style.display = "none";
        content.style.display = "block";
        content.classList.add("loaded");
        return;
    }

    let progress = 0;
    const bar = document.getElementById("progress");
    const percent = document.getElementById("percent");

    content.style.display = "none";

    const interval = setInterval(() => {

        progress += Math.random() * 10;
        if (progress > 100) progress = 100;

        if (bar) bar.style.width = progress + "%";
        if (percent) percent.textContent = Math.floor(progress) + "%";

        if (progress === 100) {
            clearInterval(interval);

            setTimeout(() => {
                loader.style.display = "none";

                content.style.display = "block";
                content.classList.add("loaded");

                sessionStorage.setItem("loaderShown", "true");
            }, 300);
        }

    }, 80);
});