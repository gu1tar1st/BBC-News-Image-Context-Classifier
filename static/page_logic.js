document.getElementById("urlForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const url = document.getElementById("urlInput").value;

    try {
        const response = await fetch(`/submit-url/${encodeURIComponent(url)}`, {
          method: 'POST'
        })
        if (response.status == 404) {
            document.getElementById("urlStatus").textContent = "Cannot find API link";
        } else {
            const result = await response.text();
            if (result.includes("Valid link")) {
                document.getElementById("urlStatus").style.color = "green"
            } else {
                document.getElementById("urlStatus").style.color = "crimson"
            }
            document.getElementById("urlStatus").textContent = result;
        }

    } catch (error) {
        document.getElementById("urlStatus").textContent = "Fetching API error";
    }
});

document.getElementById("reveal-img-button").addEventListener("click", async function (e) {
    e.preventDefault();
    const url = document.getElementById("urlInput").value;
    let modal_body = document.getElementById("img-body");

    try {
        const response = await fetch(`/get-images/${encodeURIComponent(url)}`, {
           method: "GET"
        });

        if (response.status == 404 || response === null) {
            let imgStatus = document.createElement("h4");
            imgStatus.id = "imgStatus";
            imgStatus.textContent = "Cannot find images with such URL";
            imgStatus.style.color = "Crimson"
            modal_body.appendChild(imgStatus);
        }

        // Response is json formatted
        let json_response = await response.json();
        for (let key in json_response) {
            let img = document.createElement("img");
            img.src = json_response[key];
            img.classList = 'img-fluid img-thumbnail';
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
        modal_body.append(imgStatus)
    }
})

document.getElementById("reveal-context-button").addEventListener("click", async function(e) {
    e.preventDefault();
    const url = document.getElementById("urlInput").value;
    let modal_body = document.getElementById("context-body");
    let spinner_bar = document.getElementById("spinner-bar");

    try {
        spinner_bar.style.display = "block";
        const response = await fetch(`/get-context/${encodeURIComponent(url)}`, {
            method: "GET"
        })

        if (response.status == 404) {
            let contextStatus = document.createElement("h4");
            contextStatus.id = "contextStatus";
            contextStatus.textContent = "Cannot determine the context, most likely images not found.";
            contextStatus.style.color = "Crimson";
            modal_body.appendChild(contextStatus);
        }

        // Images found and contexts are given back
        let result = await response.text();
        let output = document.createElement("pre"); // Pre tag allows pre-formatted string
        output.id = "FormattedResult";
        output.textContent = result;
        modal_body.appendChild(output);
    } catch (error) {
        let contextStatus = document.createElement("h4");
        contextStatus.id = "contextStatus";
        contextStatus.textContent = "Internal server error";
        contextStatus.style.color = "Crimson";
        modal_body.appendChild(contextStatus);
    } finally {
        spinner_bar.style.display = "none";
    }
})

document.getElementById("close-button").addEventListener("click", function(e) {
    e.preventDefault();
    let modal_body = document.getElementById("img-body");
    let imgStatus = document.getElementById("imgStatus");
    let img = modal_body.getElementsByTagName("img");
    let downline = modal_body.getElementsByTagName("downline");
    if (imgStatus) {
        modal_body.removeChild(imgStatus);
    }

    if (img) {
        modal_body.innerHTML = '';
    }
})

document.getElementById("close-context-button").addEventListener("click", function(e) {
    e.preventDefault();
    let modal_body = document.getElementById("context-body");
    modal_body.innerHTML = '';
})