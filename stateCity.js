/* ============================================================
   stateCity.js  –  India States & Cities data + helper
   Used by: flight.html, train.html, hotel.html, movie.html
   ============================================================ */

const INDIA_STATE_CITIES = {
  "Andhra Pradesh": ["Visakhapatnam","Vijayawada","Guntur","Nellore","Kurnool","Tirupati","Rajahmundry","Kakinada","Kadapa","Anantapur"],
  "Arunachal Pradesh": ["Itanagar","Naharlagun","Pasighat","Tawang","Ziro","Along","Bomdila","Tezu","Roing","Namsai"],
  "Assam": ["Guwahati","Silchar","Dibrugarh","Jorhat","Nagaon","Tinsukia","Tezpur","Bongaigaon","Dhubri","North Lakhimpur"],
  "Bihar": ["Patna","Gaya","Bhagalpur","Muzaffarpur","Purnia","Darbhanga","Bihar Sharif","Arrah","Begusarai","Katihar"],
  "Chhattisgarh": ["Raipur","Bhilai","Bilaspur","Korba","Durg","Rajnandgaon","Jagdalpur","Ambikapur","Raigarh","Dhamtari"],
  "Goa": ["Panaji","Margao","Vasco da Gama","Mapusa","Ponda","Bicholim","Curchorem","Sanquelim","Canacona","Quepem"],
  "Gujarat": ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Gandhinagar","Junagadh","Anand","Nadiad"],
  "Haryana": ["Faridabad","Gurgaon","Panipat","Ambala","Yamunanagar","Rohtak","Hisar","Karnal","Sonipat","Panchkula"],
  "Himachal Pradesh": ["Shimla","Dharamshala","Solan","Mandi","Baddi","Palampur","Nahan","Kullu","Chamba","Hamirpur"],
  "Jharkhand": ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Deoghar","Phusro","Hazaribagh","Giridih","Ramgarh","Medininagar"],
  "Karnataka": ["Bengaluru","Mysuru","Hubballi","Mangaluru","Belagavi","Kalaburagi","Ballari","Vijayapura","Shivamogga","Tumkur"],
  "Kerala": ["Thiruvananthapuram","Kochi","Kozhikode","Kollam","Thrissur","Alappuzha","Palakkad","Malappuram","Kannur","Kottayam"],
  "Madhya Pradesh": ["Indore","Bhopal","Jabalpur","Gwalior","Ujjain","Sagar","Ratlam","Satna","Rewa","Murwara"],
  "Maharashtra": ["Mumbai","Pune","Nagpur","Nashik","Aurangabad","Thane","Navi Mumbai","Solapur","Kolhapur","Amravati"],
  "Manipur": ["Imphal","Thoubal","Bishnupur","Churachandpur","Senapati","Ukhrul","Chandel","Tamenglong","Jiribam","Moreh"],
  "Meghalaya": ["Shillong","Tura","Jowai","Nongstoin","Baghmara","Williamnagar","Nongpoh","Resubelpara","Mairang","Cherrapunji"],
  "Mizoram": ["Aizawl","Lunglei","Saiha","Champhai","Kolasib","Serchhip","Lawngtlai","Mamit","Aibawk","Hnahthial"],
  "Nagaland": ["Kohima","Dimapur","Mokokchung","Tuensang","Wokha","Zunheboto","Phek","Mon","Kiphire","Longleng"],
  "Odisha": ["Bhubaneswar","Cuttack","Rourkela","Brahmapur","Sambalpur","Puri","Balasore","Bhadrak","Baripada","Jharsuguda"],
  "Punjab": ["Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda","Mohali","Hoshiarpur","Pathankot","Moga","Firozpur"],
  "Rajasthan": ["Jaipur","Jodhpur","Kota","Bikaner","Ajmer","Udaipur","Bhilwara","Alwar","Bharatpur","Sikar"],
  "Sikkim": ["Gangtok","Namchi","Pelling","Mangan","Jorethang","Ravangla","Soreng","Gyalshing","Lachen","Lachung"],
  "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli","Vellore","Erode","Thoothukudi","Hosur"],
  "Telangana": ["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam","Mahbubnagar","Ramagundam","Nalgonda","Adilabad","Suryapet"],
  "Tripura": ["Agartala","Udaipur","Dharmanagar","Kailasahar","Belonia","Ambassa","Sonamura","Melaghar","Sabroom","Khowai"],
  "Uttar Pradesh": ["Lucknow","Kanpur","Agra","Varanasi","Prayagraj","Ghaziabad","Noida","Meerut","Aligarh","Bareilly"],
  "Uttarakhand": ["Dehradun","Haridwar","Roorkee","Haldwani","Rudrapur","Kashipur","Rishikesh","Mussoorie","Nainital","Almora"],
  "West Bengal": ["Kolkata","Howrah","Durgapur","Asansol","Siliguri","Bardhaman","Malda","Baharampur","Habra","Kharagpur"],
  "Andaman & Nicobar Islands": ["Port Blair","Diglipur","Mayabunder","Rangat","Havelock Island","Neil Island","Car Nicobar","Campbell Bay"],
  "Chandigarh": ["Chandigarh"],
  "Dadra & Nagar Haveli and Daman & Diu": ["Silvassa","Daman","Diu"],
  "Delhi": ["New Delhi","Dwarka","Rohini","Janakpuri","Laxmi Nagar","Saket","Pitampura","Karol Bagh","Connaught Place","Vasant Kunj"],
  "Jammu & Kashmir": ["Srinagar","Jammu","Anantnag","Baramulla","Sopore","Kathua","Udhampur","Pampore","Pulwama","Leh"],
  "Ladakh": ["Leh","Kargil","Diskit","Padum","Nubra","Turtuk","Hanle"],
  "Lakshadweep": ["Kavaratti","Agatti","Amini","Andrott","Minicoy"],
  "Puducherry": ["Puducherry","Karaikal","Mahe","Yanam"]
};

const STATE_NAMES = Object.keys(INDIA_STATE_CITIES).sort();

/**
 * Populate a <select> with state options.
 * @param {string} selectId  – id of the <select> element
 * @param {string} placeholder – first disabled option text
 */
function populateStates(selectId, placeholder = "Select State") {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = `<option value="" disabled selected>${placeholder}</option>`;
  STATE_NAMES.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    sel.appendChild(opt);
  });
}

/**
 * Populate a <select> with cities for a given state,
 * then optionally auto-select a city.
 * @param {string} stateSelectId  – id of the state <select>
 * @param {string} citySelectId   – id of the city <select>
 * @param {string} placeholder    – first disabled option text
 */
function populateCities(stateSelectId, citySelectId, placeholder = "Select City") {
  const stateSel = document.getElementById(stateSelectId);
  const citySel  = document.getElementById(citySelectId);
  if (!stateSel || !citySel) return;

  const state = stateSel.value;
  const cities = INDIA_STATE_CITIES[state] || [];

  citySel.innerHTML = `<option value="" disabled selected>${placeholder}</option>`;
  citySel.disabled = cities.length === 0;

  cities.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    citySel.appendChild(opt);
  });
}

/**
 * Wire up a state+city pair automatically.
 * Call once after DOM ready.
 * @param {string} stateId
 * @param {string} cityId
 */
function wireStateCity(stateId, cityId, cityPlaceholder = "Select City") {
  populateStates(stateId);
  const citySel = document.getElementById(cityId);
  if (citySel) { citySel.disabled = true; citySel.innerHTML = `<option value="" disabled selected>${cityPlaceholder}</option>`; }
  const stateSel = document.getElementById(stateId);
  if (stateSel) {
    stateSel.addEventListener('change', () => populateCities(stateId, cityId, cityPlaceholder));
  }
}
