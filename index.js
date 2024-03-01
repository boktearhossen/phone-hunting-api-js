const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = (phones) => {
    const phonContainer = document.getElementById('phone-container')
    //remove previous data
    phonContainer.innerText = ''
    // show all button 
     const showAllContainer = document.getElementById('show-all-container')
      if(phones.length > 8){
        showAllContainer.classList.remove('hidden')
      }else{
        showAllContainer.classList.add('hidden')
      }

    //diaplay only 8 data
     phones = phones.slice(0,8)

    phones.forEach(phone => {
        // console.log('hello phone');
        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card card-compact  bg-base-100 p-5 shadow-xl'
        phoneCard.innerHTML =`
        <figure><img src=${phone.image} alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <h1 class="text-2xl font-bold">${phone.brand}</h1>
          <div class="card-actions justify-end">
            <button onclick="handleShowDetails('${phone.slug}') " class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `
      phonContainer.appendChild(phoneCard)

    }) 
    // hidden loading spinner
    LoadingSpinner(false)

}

// show details 
const handleShowDetails = async(id) => {
  //https://openapi.programming-hero.com/api/phone/${id}
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phone = data.data
  showphonedetails(phone)
}
//show phon details
const showphonedetails = (phone) => {
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');

  showDetailContainer.innerHTML = `
      <img src="${phone.image}" alt="" />
      <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
      <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
      <p><span>GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
  `


  show_details_modal.showModal()
  console.log(phone)
}


// search
const handleSearch=()=>{
    // call LoadingSpinner function
    LoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
   //   console.log(searchText)
    loadPhone(searchText)
 }


// loading spinner
const LoadingSpinner =(isLoading)=> {
    const spinner = document.getElementById('spinner')
    if(isLoading){
        spinner.classList.remove('hidden')
    }else{
        spinner.classList.add('hidden')
    }
}

// handle show all functionality
const handleShowAll = (phones)=> {
    console.log(phones);
}