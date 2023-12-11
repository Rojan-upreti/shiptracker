document.addEventListener('DOMContentLoaded', function () {
    const textElement = document.getElementById('typewriter-text');
    const textContent = textElement.innerText;
    textElement.innerText = ''; // Clear the text content

    let charIndex = 0;

    function type() {
        if (charIndex < textContent.length) {
            textElement.innerHTML += textContent.charAt(charIndex);
            charIndex++;
            setTimeout(type, 75); // Adjust the typing speed here
        }
    }

    type(); // Start the typing animation
});



/////js for the api fetch


async function checkTracking() {
    const trackingNumber = document.getElementById('trackingNumber').value;
  
    if (!trackingNumber) {
      alert('Please enter a tracking number');
      return;
    }
  
    const url = `https://trackingmore.p.rapidapi.com/packages/v2/track?trackingNumber=${trackingNumber}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'e103ae6439msh8ae623b9b2e67d6p156278jsnfab23ab8d991',
        'X-RapidAPI-Host': 'trackingmore.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      displayStatus(result);
    } catch (error) {
      console.error(error);
      alert('Error fetching tracking information');
    }
  }
  
  function displayStatus(result) {
    const statusResultDiv = document.getElementById('statusResult');
    statusResultDiv.innerHTML = ''; // Clear previous results
  
    if (result.originCountryData && result.originCountryData.trackinfo) {
      const trackInfo = result.originCountryData.trackinfo;
  
      trackInfo.forEach(info => {
        const statusItem = document.createElement('div');
        statusItem.innerHTML = `<p>${info.StatusDescription}</p>
                               <p>Date: ${info.Date}</p>
                               <p>Details: ${info.Details}</p>
                               <img src="${info.status_img}" alt="Status Image">`;
        statusResultDiv.appendChild(statusItem);
      });
    } else {
      statusResultDiv.innerHTML = '<p>No tracking information available.</p>';
    }
  }
  