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