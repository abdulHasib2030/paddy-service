const showItem = document.getElementById('item-show')
const categoryContainer = document.getElementById('category-container')
const likeImage = document.getElementById('like-image')
const sortPrice = document.getElementById('sort-by-price')
const spinner = document.getElementById('spinner')



const loadDataAll = async (category, sort = false) => {


    //  console.log(category)
    const url = category ? `https://openapi.programming-hero.com/api/peddy/category/${category}` : 'https://openapi.programming-hero.com/api/peddy/pets'
    const response = await fetch(url)
    const data = await response.json()



    const datatem = data.pets ? data.pets : data.data
    // console.log(data2)
    // const 
    const data2 = sort ? (datatem.sort((a, b) => (-(a.price - b.price)))) : datatem
    console.log()
    // console.log(ab)
    if (data2.length > 0) {

        data2.forEach((element) => {

            let newArr = (element.date_of_birth ? element.date_of_birth.split('-') : "")
            // console.log(newArr[0])
            showItem.classList = 'grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:w-4/5'
            const div = document.createElement('div')
            div.classList = 'border-2 p-5 rounded-xl '

            div.innerHTML = `
            <div>
            
                            <img src="${element.image}" class="rounded-lg alt="not available">
                            <h3 class="text-xl font-bold mt-4 mb-2">${element.pet_name ? `${element.pet_name}` : "Not Available"}</h3>
                            <div class="flex gap-4 text-[#131313B3] items-center">
                                <img src="./images/menu.png" class="w-4 h-4" alt="">
                                <p>Breed: ${element.breed ? `${element.breed}` : "Not Available"}</p>
                            </div>
                            <div class="flex gap-4 text-[#131313B3] items-center">
                                <i class="fa-solid fa-cake-candles w-4 h-4"></i>
                                <p>Birth: ${newArr[0] ? `${newArr[0]}` : "Not Available"}</p>
                            </div>
                            <div class="flex gap-4 text-[#131313B3] items-center">
                                <i class="fa-solid fa-venus"></i>
                                <p>Gender: ${element.gender ? `${element.gender}` : "Not Available"}</p>
                            </div>
                            <div class="flex gap-4 text-[#131313B3] items-center">
                                <i class="fa-solid fa-dollar-sign"></i>
                                <p >Price: ${element.price ? `${element.price}$` : "Not Available"} </p>
                            </div>
                        </div>
                        <hr>
                        <div class="flex gap-4 mt-4">
                            <div class="py-2 px-2 border-2 rounded-lg hover:border-[#0E7A81]" onclick ="likeImageShow('${element.image}')">
                                <img src="./images/favorite.png" alt="" class=""  w-5 h-5">
                            </div>

                            <button  class="py-2 px-4 border-2 rounded-lg font-bold text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white " id='adopt-${element.petId}'  onclick=adopModel('${element.petId}')>Adopt</button>
                            <button class="py-2 px-4 border-2 rounded-lg font-bold text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white" onclick=showPetDetails('${element.petId}')>Details</button>
                        </div>
        `
            showItem.append(div)
        });
    }
    else {
        showItem.classList = 'md:w-4/5'
        const div = document.createElement('div')
        div.classList.add('text-center')
        div.innerHTML = `
        <img src="./images/error.webp" class="mx-auto" alt="">
                    <h1 class="text-3xl font-bold my-4">No Information Available</h1>
                    <p class="space-y-3 text-[#131313B3]">Currently, there is no information available for this category. Please check back later or explore other options. If you need assistance, feel free to reach out to our support team for help.</p>
        `
        showItem.append(div)
    }



}



// load category
const showCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await response.json()
    data.categories.forEach((element) => {
        const div = document.createElement('div')
        div.id = `category-${element.id}`
        div.setAttribute('onclick', `showCategoryItem('${element.category}','${element.id}')`)

        div.classList = 'p-6  gap-4 border rounded-2xl flex items-center  '
        div.innerHTML = `
        <img src="${element.category_icon}" alt="">
                    <h3 class="font-bold text-xl">${element.category}</h3>
       `

        categoryContainer.append(div)
    })
}

const showCategoryItem = (category, id) => {
    // console.log(id, "FDSdg")
    const activeBtn = document.getElementById(`category-${id}`)
    //  console.log(activeBtn, "SDFJkl")
    const child = categoryContainer.children
    for (let i = 0; i < child.length; i++) {
        let sp = (child[i].className.split(' '))
        if (sp.includes('active-category')) {
            child[i].classList.remove('active-category')
        }
    }

    activeBtn.classList.add('active-category')

    showItem.innerHTML = ''
    loadSpinner(category)
}

// Like click image show 
let sum = 2;
const likeImageShow = (element) => {

    console.log(sum)
    console.log(element)
    if (sum % 2 == 0) {
        const div = document.createElement('div')
        div.classList = 'grid grid-cols-2 gap-3 rounded-lg mb-4'
        div.innerHTML = `
        <img src="${element}" alt="">    
        `
        likeImage.append(div)
    }
    else {
        const img = document.createElement('img');
        img.src = element;
        img.alt = "Image";
        (likeImage.lastChild.appendChild(img))
    }
    sum += 1


}

// Details show for pets
const showPetDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => {

            const div = document.createElement('dialog')
            const { image, breed, date_of_birth, gender, price, vaccinated_status, pet_name, pet_details } = data.petData
            // console.log(data.petData.pet_details, pet_details)
            div.id = 'my_modal_4'
            div.classList.add('modal')


            div.innerHTML = `
   <div class="modal-box w-11/12 max-w-5xl">
            <img src="${image}" class="w-full" alt="">
            <h1 class="font-bold text-3xl my-6">${pet_name ? `${pet_name}` : "Not Available"}</h1>

            <div>
                <div class="grid grid-cols-2 space-y-2 mb-3">

                    <div class="flex gap-4 text-[#131313B3] items-center">
                        <img src="./images/menu.png" class="w-4 h-4" alt="">
                        <p>Breed: ${breed ? `${breed}` : "Not Available"}</p>
                    </div>
                    <div class="flex gap-4 text-[#131313B3] items-center">
                        <i class="fa-solid fa-cake-candles w-4 h-4"></i>
                        <p>Birth: ${date_of_birth ? `${date_of_birth}` : "Not Available"} </p>
                    </div>
                    <div class="flex gap-4 text-[#131313B3] items-center">
                        <i class="fa-solid fa-venus"></i>
                        <p>Gender: ${gender ? `${gender}` : "Not Available"} </p>
                    </div>
                    <div class="flex gap-4 text-[#131313B3] items-center">
                        <i class="fa-solid fa-dollar-sign"></i>
                        <p>Price: ${price ? `${price}$` : "Not Available"}</p>
                    </div>
                    <div class="flex gap-4 text-[#131313B3] items-center">
                        <i class="fa-solid fa-dollar-sign"></i>
                        <p>Vaccinated status: ${vaccinated_status ? `${vaccinated_status}` : "Not Available"}</p>
                    </div>
                </div>
                <hr>
                
                    <h4 class="font-bold text-xl my-3">Details Information</h4>
                    <p class="mb-5">${pet_details ? `${pet_details}` :"Not Available"}</p>
                
            </div>


            <form method="dialog" >
                <button class="w-full mx-auto border-2 py-4 bg-[#0E7A811A] text-[#0E7A81] font-bold rounded-lg">Close</button>
            </form>
        </div>
`
            document.body.appendChild(div)
            div.showModal()
        })

}

// adop Model
function adopModel(petId) {
    const disabled = document.getElementById(`adopt-${petId}`)
    disabled.classList.remove('text-[#0E7A81]')
    disabled.classList.add('btn-disabled')
    disabled.classList.add('text-gray-200')

    const dialog = document.createElement('dialog')
    dialog.classList = 'modal text-center'
    dialog.id = 'my_modal_2'
    let count = 3;
    dialog.innerHTML = `
     <div class="modal-box space-y-3">
    <img src="./images/handshake.png" class="mx-auto w-9 h-9" alt="">
    <h1 class="text-3xl font-bold">Congrates</h1>
    <p>Adoption Process is Start For your Pet</p>
      <h2 class="text-4xl font-bold" id="countdown"> ${count}</h3>
  </div>
    `
    document.body.appendChild(dialog)

    dialog.showModal()

    const interval = setInterval(() => {
        count--;
        document.getElementById('countdown').textContent = count;
        if (count === 0) {
            clearInterval(interval)
            dialog.close();
            dialog.remove();
        }
    }, 1000)





}

//  Sort by Price
sortPrice.addEventListener('click', function () {
    showItem.innerHTML = ''

    loadSpinner('', true)
})

const loadSpinner = (category = '', sort = false) => {
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
        loadDataAll(category, sort);

    }, 2000);
}
loadSpinner();
showCategory(); 
