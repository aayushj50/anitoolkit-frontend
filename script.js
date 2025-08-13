async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files.length === 0) {
        alert("Please select a file first.");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        const response = await fetch("https://anitoolkit.onrender.com/api/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.status === "success" && data.results) {
            // Display results in a readable way
            document.getElementById("output").innerHTML = `
                <h3>Processed Results:</h3>
                <pre>${JSON.stringify(data.results, null, 2)}</pre>
            `;
        } else {
            document.getElementById("output").textContent = "Upload succeeded but no results returned.";
        }

    } catch (err) {
        console.error(err);
        alert("Upload failed! See console for details.");
    }
}
