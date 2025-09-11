// Full frontend script: PG data, rendering, filters, modal, Leaflet map

// ---------- Demo PG DATA (extended list) ----------
const PG_LIST = [
  // Dehradun area (sample)
  { id:1, name:"Skyline Stays", city:"Dehradun", area:"Rajpur Road", price:6500, rating:4.6, gender:"Unisex", amenities:["WiFi","Meals","Laundry","Hot Water","Housekeeping"], distanceKm:1.2, lat:30.3180, lon:78.0280, cover:"https://images.unsplash.com/photo-1505691723518-36a5ac3b2d51?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p1/900/600","https://picsum.photos/seed/p2/900/600"], phone:"+919876543210", description:"Premium PG with airy rooms, fast Wi-Fi and homestyle meals. Walkable to cafes & market." },

  // Delhi
  { id:2, name:"Sunrise Boys PG", city:"Delhi", area:"Saket", price:5500, rating:4.2, gender:"Boys", amenities:["WiFi","Meals","Laundry"], distanceKm:1.2, lat:28.5245, lon:77.2100, cover:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p3/900/600"], phone:"+919999900001", description:"Safe and affordable boys PG near Saket." },

  // Mumbai
  { id:3, name:"Cozy Girls PG", city:"Mumbai", area:"Andheri West", price:8500, rating:4.7, gender:"Girls", amenities:["WiFi","CCTV","Meals","Gym"], distanceKm:0.5, lat:19.1190, lon:72.8479, cover:"https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p4/900/600"], phone:"+919888800002", description:"Secure PG with CCTV and homely meals." },

  // Bangalore
  { id:4, name:"Elite Unisex PG", city:"Bangalore", area:"Whitefield", price:10000, rating:4.5, gender:"Unisex", amenities:["WiFi","Power Backup","Study Room"], distanceKm:2.0, lat:12.9699, lon:77.7501, cover:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p5/900/600"], phone:"+919777700003", description:"Modern PG with furnished rooms & study area." },

  // Pune
  { id:5, name:"Budget Boys PG", city:"Pune", area:"Shivaji Nagar", price:5000, rating:4.0, gender:"Boys", amenities:["WiFi","Meals"], distanceKm:1.0, lat:18.5204, lon:73.8567, cover:"https://images.unsplash.com/photo-1505691723518-36a5ac3b2d51?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p6/900/600"], phone:"+919666600004", description:"Affordable PG close to station." },

  // Hyderabad
  { id:6, name:"Premium Girls PG", city:"Hyderabad", area:"Madhapur", price:12000, rating:4.8, gender:"Girls", amenities:["WiFi","AC","Gym","CCTV","Housekeeping"], distanceKm:2.0, lat:17.4474, lon:78.3910, cover:"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p7/900/600"], phone:"+919555500005", description:"Luxury PG with rooftop dining and premium security." },

  // Chennai
  { id:7, name:"Dream Stay Girls PG", city:"Chennai", area:"Velachery", price:8000, rating:4.3, gender:"Girls", amenities:["AC","WiFi","Meals"], distanceKm:2.5, lat:12.9941, lon:80.2268, cover:"https://images.unsplash.com/photo-1586105251261-72a756497a12?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p8/900/600"], phone:"+919444400006", description:"Well-furnished PG with hygienic meals." },

  // Kolkata
  { id:8, name:"Heritage PG", city:"Kolkata", area:"Park Street", price:7000, rating:4.4, gender:"Unisex", amenities:["WiFi","Meals","Laundry"], distanceKm:1.1, lat:22.5470, lon:88.3472, cover:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p9/900/600"], phone:"+919333300007", description:"Cozy rooms near Park Street attractions." },

  // Jaipur
  { id:9, name:"Royal Stay PG", city:"Jaipur", area:"Malviya Nagar", price:6200, rating:4.1, gender:"Unisex", amenities:["WiFi","Meals"], distanceKm:1.8, lat:26.9124, lon:75.7873, cover:"https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p10/900/600"], phone:"+919222200008", description:"Comfortable stay with warm meals." },

  // Ahmedabad
  { id:10, name:"City Comfort PG", city:"Ahmedabad", area:"Navrangpura", price:5800, rating:4.0, gender:"Boys", amenities:["WiFi","Laundry"], distanceKm:2.2, lat:23.0225, lon:72.5714, cover:"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p11/900/600"], phone:"+919111100009", description:"Good location, budget rates." },

  // Lucknow
  { id:11, name:"Peaceful PG", city:"Lucknow", area:"Gomti Nagar", price:6300, rating:4.2, gender:"Unisex", amenities:["WiFi","Housekeeping"], distanceKm:2.0, lat:26.8467, lon:80.9462, cover:"https://images.unsplash.com/photo-1505692039770-30ff1d6fd1e8?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p12/900/600"], phone:"+919000011110", description:"Clean rooms with easy commute." },

  // Surat
  { id:12, name:"River View PG", city:"Surat", area:"Adajan", price:5400, rating:4.0, gender:"Boys", amenities:["WiFi","Meals"], distanceKm:3.2, lat:21.1702, lon:72.8311, cover:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p13/900/600"], phone:"+918888800011", description:"Budget rooms, meals available." },

  // Nagpur
  { id:13, name:"Central PG", city:"Nagpur", area:"Sitabuldi", price:4800, rating:3.9, gender:"Unisex", amenities:["WiFi"], distanceKm:1.9, lat:21.1458, lon:79.0882, cover:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p14/900/600"], phone:"+918777700012", description:"Centrally located PG, affordably priced." },

  // Indore
  { id:14, name:"Student Hub PG", city:"Indore", area:"Vijay Nagar", price:5200, rating:4.0, gender:"Boys", amenities:["WiFi","Laundry"], distanceKm:2.7, lat:22.7196, lon:75.8577, cover:"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p15/900/600"], phone:"+918666600013", description:"Popular with students, near coaching centers." },

  // More (Coimbatore)
  { id:15, name:"Green Court PG", city:"Coimbatore", area:"R.S. Puram", price:5600, rating:4.1, gender:"Girls", amenities:["WiFi","Meals","Housekeeping"], distanceKm:1.6, lat:11.0168, lon:76.9558, cover:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1400&auto=format&fit=crop", photos:["https://picsum.photos/seed/p16/900/600"], phone:"+918555500014", description:"Neat girls-only PG close to colleges." }
];

// ---------- Globals & DOM ----------
const el = id => document.getElementById(id);
const grid = el('grid');
const countEl = el('count');
const citySelect = el('city');
const qInput = el('q');
const genderSelect = el('gender');
const budgetRange = el('budget');
const budgetOut = el('budgetOut');
const sortSelect = el('sort');

// Footer year
el('year').textContent = new Date().getFullYear();

// populate city dropdown (unique sorted)
const cities = Array.from(new Set(PG_LIST.map(p => p.city))).sort();
cities.forEach(c => {
  const o = document.createElement('option'); o.value = c; o.textContent = c;
  citySelect.appendChild(o);
});

// amenity chips: collect unique amenities
const AMENITIES = Array.from(new Set(PG_LIST.flatMap(p => p.amenities)));
const amenBar = el('amenitiesBar');
AMENITIES.forEach(a => {
  const b = document.createElement('button');
  b.className = 'chip'; b.textContent = a;
  b.onclick = () => {
    b.classList.toggle('active');
    render(); // re-render with new filters
  };
  amenBar.appendChild(b);
});

// ---------- Map (Leaflet) ----------
let map = null;
let markersLayer = null;
function initMap() {
  try {
    map = L.map('map', { scrollWheelZoom:false }).setView([21.1466,79.0889], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    markersLayer = L.layerGroup().addTo(map);
    // add markers for all PGs initially
    addMarkers(PG_LIST);
  } catch (e) {
    console.warn('Leaflet init error', e);
  }
}
function addMarkers(list){
  if(!markersLayer) return;
  markersLayer.clearLayers();
  list.forEach(p => {
    if(p.lat && p.lon){
      const marker = L.marker([p.lat, p.lon]);
      const popup = `<strong>${p.name}</strong><br>${p.area}, ${p.city}<br>₹ ${p.price} • ${p.gender}<br><button onclick="openFromMarker(${p.id})">View</button>`;
      marker.bindPopup(popup);
      marker.addTo(markersLayer);
    }
  });
}
function openFromMarker(id){
  // when user clicks button inside popup
  openModal(id);
}

// ---------- Render card HTML ----------
function cardHTML(p){
  return `
  <article class="card" data-id="${p.id}">
    <div class="cover">
      <img src="${p.cover}" alt="${p.name}">
      <div class="pin">${p.area}, ${p.city}</div>
    </div>
    <div class="body">
      <div class="title">
        <div>
          <h3>${p.name}</h3>
          <div class="muted">${p.gender} • ⭐ ${p.rating} • ${p.distanceKm} km</div>
        </div>
        <div class="price">₹ ${p.price}</div>
      </div>
      <div class="amen">${p.amenities.slice(0,4).map(a=>`<span>${a}</span>`).join(' ')}</div>
      <div class="actions" style="margin-top:10px">
        <button class="btn-outline" data-view="${p.id}">View details</button>
        <button class="btn" data-book="${p.id}">Book a visit</button>
      </div>
    </div>
  </article>`;
}

// ---------- Filter + Sort ----------
function getActiveAmenities(){
  return Array.from(document.querySelectorAll('.chip.active')).map(b=>b.textContent);
}

function filterAndSort(){
  const q = qInput.value.trim().toLowerCase();
  const city = citySelect.value;
  const gender = genderSelect.value;
  const maxBudget = +budgetRange.value;
  const activeAmens = getActiveAmenities();
  let rows = PG_LIST.filter(p=>{
    const matchesQ = !q || p.name.toLowerCase().includes(q) || p.area.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
    const matchesCity = !city || p.city === city;
    const matchesGender = !gender || p.gender === gender;
    const matchesBudget = p.price <= maxBudget;
    const matchesA = activeAmens.every(a => p.amenities.includes(a));
    return matchesQ && matchesCity && matchesGender && matchesBudget && matchesA;
  });
  switch(sortSelect.value){
    case 'price-asc': rows.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': rows.sort((a,b)=>b.price-a.price); break;
    case 'rating': rows.sort((a,b)=>b.rating-a.rating); break;
    case 'distance': rows.sort((a,b)=>a.distanceKm-b.distanceKm); break;
    default: break;
  }
  return rows;
}

// ---------- Render ----------
function render(){
  const rows = filterAndSort();
  countEl.textContent = `${rows.length} ${rows.length===1?'result':'results'}`;
  grid.innerHTML = rows.map(cardHTML).join('');
  // attach listeners
  grid.querySelectorAll('[data-view]').forEach(b=> b.addEventListener('click', ()=> openModal(+b.dataset.view)));
  grid.querySelectorAll('[data-book]').forEach(b=> b.addEventListener('click', ()=> bookVisit(+b.dataset.book)));

  // update markers
  addMarkers(rows);

  // if there are rows, fit map to bounds
  if(map && rows.length){
    const latlngs = rows.filter(p=>p.lat&&p.lon).map(p=>[p.lat,p.lon]);
    if(latlngs.length) map.fitBounds(latlngs, { padding:[40,40], maxZoom:13 });
  }
}

// ---------- Modal ----------
const modal = el('modal');
const mClose = el('mClose');
function openModal(id){
  const p = PG_LIST.find(x=>x.id===id);
  if(!p) return;
  el('mTitle').textContent = p.name;
  el('mDesc').textContent = p.description;
  el('mLoc').textContent = `${p.area}, ${p.city}`;
  el('mGender').textContent = p.gender;
  el('mRating').textContent = p.rating;
  el('mDist').textContent = `${p.distanceKm} km`;
  el('mPrice').textContent = `₹ ${p.price}`;
  el('mGallery').innerHTML = p.photos.map(src=>`<img src="${src}" alt="${p.name}">`).join('');
  el('mAmen').innerHTML = p.amenities.map(a=>`<span class="tag">${a}</span>`).join(' ');
  el('btnCall').onclick = ()=> window.open(`tel:${p.phone.replace(/\s/g,'')}`);
  el('btnVisit').onclick = ()=> {
    const txt = encodeURIComponent(`Hi, I want to book a visit for ${p.name} at ${p.area}, ${p.city}.`);
    const num = (p.phone.match(/\d/g)||[]).join('').slice(-10);
    window.open(`https://wa.me/91${num}?text=${txt}`, '_blank');
  };
  modal.classList.add('open');
}
mClose.addEventListener('click', ()=> modal.classList.remove('open'));
modal.addEventListener('click', (e)=> { if(e.target === modal) modal.classList.remove('open'); });

function bookVisit(id){
  openModal(id);
}

// ---------- Events ----------
el('btnSearch').addEventListener('click', ()=> render());
budgetRange.addEventListener('input', ()=> budgetOut.textContent = '≤ '+budgetRange.value);
sortSelect.addEventListener('change', ()=> render());
qInput.addEventListener('input', ()=> render());
citySelect.addEventListener('change', ()=> render());
genderSelect.addEventListener('change', ()=> render());

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', ()=>{
  try { initMap(); } catch(e){ console.warn('map init failed', e); }
  render();
});
fetch("cities.json")
  .then(response => response.json())
  .then(cities => {
    const cityDropdown = document.getElementById("city");
    cities.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      cityDropdown.appendChild(option);
    });
  })
  .catch(error => console.error("Error loading cities:", error));
// Cities dropdown aur rooms container access kar rahe
const cityDropdown = document.getElementById("city");
const roomsContainer = document.getElementById("rooms");

// JSON file se rooms data fetch
fetch("rooms.json")
  .then(response => response.json())
  .then(data => {
    // Dropdown change event
    cityDropdown.addEventListener("change", () => {
      const selectedCity = cityDropdown.value;
      roomsContainer.innerHTML = ""; // Purane rooms clear

      if (data[selectedCity]) {
        data[selectedCity].forEach(room => {
          // Room card create
          const roomCard = document.createElement("div");
          roomCard.classList.add("room-card");

          roomCard.innerHTML = `
            <img src="${room.image}" alt="${room.name}" class="room-img">
            <h3>${room.name}</h3>
            <p><strong>Price:</strong> ${room.price}</p>
            <p><strong>Gender:</strong> ${room.gender}</p>
          `;

          roomsContainer.appendChild(roomCard);
        });
      } else {
        roomsContainer.innerHTML = `<p>No rooms found for ${selectedCity}</p>`;
      }
    });
  })
  .catch(error => console.error("Error loading rooms.json:", error));
