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
        document.getElementById("output").innerHTML = JSON.stringify(data, null, 2);

    } catch (err) {
        console.error(err);
        alert("Upload failed!");
    }
}
