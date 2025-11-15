let contextClicked = false;
let context = null;

document.getElementById("urlForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const url = document.getElementById("urlInput").value;

    try {
        const response = await fetch(`/submit-url/${encodeURIComponent(url)}`, {
            method: 'POST'
        });

        if (response.status === 404) {
            document.getElementById("urlStatus").textContent = "Cannot find API link";
        } else {
            const result = await response.text();
            document.getElementById("urlStatus").style.color = result.includes("Valid link") ? "green" : "crimson";
            document.getElementById("urlStatus").textContent = result;
        }
    } catch (error) {
        document.getElementById("urlStatus").textContent = "Fetching API error";
    }
});

document.getElementById("reveal-img-button").addEventListener("click", async function(e) {
    e.preventDefault();
    const url = document.getElementById("urlInput").value;
    let modal_body = document.getElementById("img-body");
    modal_body.innerHTML = ''; // clear old content

    try {
        const response = await fetch(`/get-images/${encodeURIComponent(url)}`, {
            method: "GET"
        });

        if (response.status === 404) {
            let imgStatus = document.createElement("h4");
            imgStatus.id = "imgStatus";
            imgStatus.textContent = "Cannot find images with such URL";
            imgStatus.style.color = "Crimson";
            modal_body.appendChild(imgStatus);
            return;
        }

        let json_response = await response.json();
        for (let key in json_response) {
            let img = document.createElement("img");
            img.src = json_response[key];
            img.className = 'img-fluid img-thumbnail';
            let downline = document.createElement("br");
            downline.className = 'downline';
            modal_body.appendChild(img);
            modal_body.appendChild(downline);
        }
    } catch (error) {
        let imgStatus = document.createElement("h4");
        imgStatus.id = "imgStatus";
        imgStatus.textContent = "Internal server error";
        imgStatus.style.color = "Crimson";
        modal_body.appendChild(imgStatus);
    }
});

document.getElementById("reveal-context-button").addEventListener("click", async function(e) {
    e.preventDefault();
    let modal_body = document.getElementById("context-body");

    // Show cached context if available
    if (context) {
        let output = document.createElement("pre");
        output.id = "FormattedResult";
        output.textContent = context;
        modal_body.appendChild(output);
    }

    if (e.isTrusted && contextClicked === false) {
        const url = document.getElementById("urlInput").value;
        let spinner_bar = document.getElementById("spinner-bar");

        try {
            if (spinner_bar) spinner_bar.style.display = "block";

            const response = await fetch(`/get-context/${encodeURIComponent(url)}`, {
                method: "GET"
            });

            if (response.status === 404) {
                let contextStatus = document.createElement("h4");
                contextStatus.id = "contextStatus";
                contextStatus.textContent = "Cannot determine the context, most likely images not found.";
                contextStatus.style.color = "Crimson";
                modal_body.appendChild(contextStatus);
                return;
            }

            let result = await response.text();
            context = result;

            let output = document.createElement("pre");
            output.id = "FormattedResult";
            output.textContent = result;
            modal_body.appendChild(output);

            console.log(context);
        } catch (error) {
            let contextStatus = document.createElement("h4");
            contextStatus.id = "contextStatus";
            contextStatus.textContent = "Internal server error";
            contextStatus.style.color = "Crimson";
            modal_body.appendChild(contextStatus);
        } finally {
            if (spinner_bar && spinner_bar.style.display === "block") {
                spinner_bar.style.display = "none";
            }
            contextClicked = true;
        }
    }
});

document.getElementById("close-button").addEventListener("click", function(e) {
    e.preventDefault();
    let modal_body = document.getElementById("img-body");
    modal_body.innerHTML = ''; // clears all images and statuses
});

document.getElementById("close-context-button").addEventListener("click", function(e) {
    e.preventDefault();
    if (context !== null) {
        let modal_body = document.getElementById("context-body");

        const spinnerBar = document.createElement("div");
        spinnerBar.id = "spinner-bar";
        spinnerBar.style.display = "none";

        const spinner = document.createElement("div");
        spinner.className = "spinner-grow text-success";
        spinner.setAttribute("role", "status");

        const hiddenText = document.createElement("span");
        hiddenText.className = "visually-hidden";
        hiddenText.textContent = "Loading...";

        spinner.appendChild(hiddenText);
        spinnerBar.appendChild(spinner);

        modal_body.innerHTML = '';
        modal_body.appendChild(spinnerBar);
        contextClicked = false;
    }
});
