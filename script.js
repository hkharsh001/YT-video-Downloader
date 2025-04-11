async function getDownloadLinks() {
  const url = document.getElementById('videoUrl').value;
  const result = document.getElementById('result');
  result.innerHTML = "Processing...";

  const formData = new URLSearchParams();
  formData.append("url", url); // Sending the video URL

  try {
    const response = await fetch("https://youtube-media-downloader.p.rapidapi.com/v2/misc/list-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com",
        "x-rapidapi-key": "bb66ee0070msh0a898350816c622p16d84djsn597a2c7c97f4"
      },
      body: formData
    });

    const data = await response.json();
    console.log(data);

    if (data && data.links && data.links.length > 0) {
      result.innerHTML = `
        ${data.title ? `<h2>${data.title}</h2>` : ""}
        ${data.thumbnail ? `<img src="${data.thumbnail}" width="300" />` : ""}
        <h3>Download Links:</h3>
      `;

      data.links.forEach(link => {
        result.innerHTML += `<a href="${link.url}" target="_blank" class="download-link">${link.quality || 'Download'}</a>`;
      });
    } else {
      result.innerHTML = "No downloadable links found.";
    }
  } catch (error) {
    console.error(error);
    result.innerHTML = "Something went wrong.";
  }
}
