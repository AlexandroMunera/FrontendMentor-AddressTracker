let mymap = L.map("mapid");
const inputIP = document.getElementById("inputIP");
const IPAdress = document.getElementById("IPAdress");
const LOCATION = document.getElementById("LOCATION");
const TIMEZONE = document.getElementById("TIMEZONE");
const ISP = document.getElementById("ISP");
const btnSearch = document.getElementById("btnSearch");

var greenIcon  = L.icon({
    iconUrl: 'images/icon-location.svg',
    // shadowUrl: 'leaf-green.png',

    iconSize:     [38, 45], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function showMap(lat = 51.505, lng = -0.09) {
  mymap.setView([lat, lng], 15);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiYWxleGFuZHJvbXVuZXJhIiwiYSI6ImNrbG1wbGdubDBhMTEyd21mM2lna3Qxc3UifQ.XdvkjwazuNH2fHk3zYYAWg",
    }
  ).addTo(mymap);
  // L.marker([lat, lng]).addTo(mymap);
  L.marker([lat, lng], {icon: greenIcon}).addTo(mymap);

}

function getData(IP = "") {
  const urlBase =
    "https://geo.ipify.org/api/v1?apiKey=at_OnFlL4pfwcg0Cr30UuitJiLdE5B0n";
  const url = IP !== "" ? `${urlBase}&ipAddress=${IP}` : `${urlBase}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("data :>> ", data);
      IPAdress.textContent = data.ip;
      LOCATION.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
      TIMEZONE.textContent = data.location.timezone;
      ISP.textContent = data.isp;

      showMap(data.location.lat, data.location.lng);
    });
}

btnSearch.addEventListener(
  "click",
  function (e) {
    console.log("inputIP :>> ", inputIP.value);
    getData(inputIP.value);
  },
  false
);

window.onload = getData();
