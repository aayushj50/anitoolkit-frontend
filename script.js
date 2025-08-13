async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files.length === 0) {
        alert("Please select a file first.");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    document.getElementById("output").innerHTML = "Processing... Please wait.";

    try {
        const response = await fetch("https://anitoolkit.onrender.com/api/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.status === "success") {
            let html = `<h3>Reports:</h3>`;
            data.report_urls.forEach(url => {
                html += `<p><a href="${url}" target="_blank">${url}</a></p>`;
                html += `<iframe src="${url}" width="100%" height="800"></iframe><br>`;
            });
            document.getElementById("output").innerHTML = html;
        } else {
            document.getElementById("output").innerHTML = "Processing failed.";
        }

    } catch (err) {
        console.error(err);
        document.getElementById("output").innerHTML = "Error processing file.";
    }
}
