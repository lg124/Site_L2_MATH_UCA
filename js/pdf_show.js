document.addEventListener("DOMContentLoaded", () => {
    const url = document.URL;
    var parsedURL = url.split("?pdf=");
    pdf_link = parsedURL[1];
    pdfContainer = document.getElementById("pdf-container");
    pdfContainer.innerHTML = `<embed src="..\\ressources\\${pdf_link}" height="95%" width="95%" type="application/pdf"/>
`;
});