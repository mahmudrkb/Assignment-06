function scrollMainSection() {
  document.getElementById("mainSection").scrollIntoView({
    behavior: "smooth",

  });
}

const activeRemoveBtn = () => {
  const buttons = document.getElementsByClassName("btn-category");

  for (let btn of buttons) {
    btn.classList.remove("activeButtonBtn");
  }
};

const loadDetails = (petId) => {
  // console.log(petId)

  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.petData))
    .catch((error) => console.log(error));
};

const displayDetails = (Details) => {
  const DetailsContainer = document.getElementById("modal-content");
  DetailsContainer.innerHTML = `
    <img class="w-full" src=${Details.image}/>
     <h2 class="card-title">${Details.pet_name}</h2>
               <div class="grid grid-cols-2">

               ${Details.breed?
                ` <div class="flex gap-2 "> <img src="./images/Frame (3).svg" alt=""> Breed:${Details.breed}</div>`
                :` <div class="flex gap-2 "> <img src="./images/Frame (3).svg" alt=""> Breed:N/A</div>`
               }

               ${Details.date_of_birth?
                `<div class="flex gap-2"> <img src="./images/Frame.svg" alt=""> Birth:${Details.date_of_birth}
                        </div>`
                :`<div class="flex gap-2"> <img src="./images/Frame.svg" alt=""> Birth:N/A
                        </div>`
               }

               ${Details.gender?
                `<div class="flex gap-2">  <img src="./images/Frame (1).svg" alt=""> Gender:${Details.gender} </div>`
                :`<div class="flex gap-2">  <img src="./images/Frame (1).svg" alt=""> Gender:N/A </div>`

               } 
               ${Details.price?
                `  <div class="flex gap-2"><img src="./images/Frame (2).svg" alt="">Price:${Details.price} </div>`
                :`  <div class="flex gap-2"><img src="./images/Frame (2).svg" alt="">Price:N/A </div>`
               }
               ${Details.vaccinated_status?
                `<div class="flex gap-2">  <img src="./images/Frame (1).svg" alt=""> vaccinated_status:${Details.vaccinated_status} </div>`
                :`<div class="flex gap-2">  <img src="./images/Frame (1).svg" alt=""> vaccinated_status:N/A </div>`
               }

               </div>

                <p class="font-bold mt-5"> Details Information:
                 </p>

                 <div>${Details.pet_details}
                 </div>


  
  `;

  document.getElementById("showModalData").click();
};

const loadSpinner = (id) => {
  document.getElementById("loadingSpinner").style.display = "block";

  setTimeout(function () {
    loadCategoryButton(id);
    sortButton()

  }, 2000);
};

const loadCategoryButton = (id) => {
  document.getElementById("loadingSpinner").style.display = "none";
  // active remove
  activeRemoveBtn();

  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("activeButtonBtn");

      displayAllPets(data.data);
    })
    .catch((error) => console.log(error));
};

// load Categories

const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
// display Categories

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categoriesBtn");
  categories.forEach((item) => {
    const div = document.createElement("div");

    div.innerHTML = `<button id="btn-${item.category}"  onclick="loadSpinner('${item.category}')"  class=" btn-category px-5 py-3 md:flex   item-center gap-1  rounded-lg  border-2 md:px-8  " >
    <img class="h-8 w-8" src=${item.category_icon}/> <p class=" font-bold text-md md:text-xl" >${item.category}</p>

    </button>
    `;

    categoryContainer.append(div);
  });
};

loadCategories();

const loadAllPet = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets))
    .catch((error) => console.log(error));
};

const displayAllPets = (pets) => {
  const allPetsContainer = document.getElementById("allPetsSec");
  allPetsContainer.innerHTML = "";

  if (pets.length == 0) {
    allPetsContainer.classList.remove("grid");
    allPetsContainer.innerHTML = `
       <div class="flex justify-center items-center m-10 space-y-5"> 
          <div class=""> 
           <img class="mx-auto" src="./images/error.webp" alt="">
       <h1 class="font-bold text-3xl" > No Information Available</h1>
       <p class="max-w-screen-md"> It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.</p>
          </div>
       </div>
       
       `;
    return;
  } else {
    allPetsContainer.classList.add("grid");
  }

  pets.forEach((pet) => {

    sortPet.push(pet);
    const card = document.createElement("div");
    card.classList = "card card-compact border rounded-md p-3";

    card.innerHTML = `
    
         
            <figure>
                <img
                src="${pet.image}"
                alt="" />
            </figure>
            <div class="card-body ">
                <h2 class="card-title">${pet.pet_name}</h2>
                
                ${pet.breed 
                  ? `<div class="flex gap-2 "> <img src="./images/Frame (3).svg" alt=""> Breed:${pet.breed}</div>`
                  : `<div class="flex gap-2 "> <img src="./images/Frame (3).svg" alt=""> Breed:N/A</div>`}

                  ${pet.date_of_birth 
                  ? ` <div class="flex gap-2"> <img src="./images/Frame.svg" alt=""> Birth:${pet.date_of_birth}
                        </div>`
                  : ` <div class="flex gap-2"> <img src="./images/Frame.svg" alt=""> Birth:N/A
                        </div>`}

                  ${pet.gender?`  <div class="flex gap-2">  <img src="./images/Frame (1).svg" alt=""> Gender:${pet.gender} </div>`
                    : `  <div class="flex gap-2">  <img src="./images/Frame (1).svg" alt=""> Gender:N/A </div>`

                  }
                  ${pet.price?
                    `  <div class="flex gap-2"><img src="./images/Frame (2).svg" alt="">Price:${pet.price} </div>`
                    :`  <div class="flex gap-2"><img src="./images/Frame (2).svg" alt="">Price:N/A</div>`
                  }


                <div class="border-t pt-3 mt-3 grid grid-cols-2 md:grid-cols-3 gap-2" >

                <button onclick="likeBtnImg('${pet.image}')" class="px-2 md:px-4 py-2 border hover:bg-teal-800  rounded-md"> <img class="mx-auto" src="./images/Frame (4).svg" alt=""> </button>

                <button onclick="adoptBtn().showModal()" class="px-2 md:px-4 py-2 border  hover:bg-teal-800 hover:text-white rounded-md">Adopt</button>

                <button onclick="loadDetails(${pet.petId})" class="px-2 md:px-4 py-2 border hover:bg-teal-800 hover:text-white rounded-md">Details</button>
                </div>

               
                </div>
            </div>
            
        `;

    allPetsContainer.append(card);
  });
};

loadAllPet();

const adoptBtn = () => {
  const adoptContainer = document.getElementById("showModalContent");
  const timeCount = document.getElementById("showTime");

  let num = 3;

  const clockId = setInterval(() => {
    num--;
    timeCount.innerHTML = num;
    if (num == 0) {
      num = 3;
      clearInterval(clockId);
      document.getElementById("adoptModal").close();
    }
  }, 1000);

  document.getElementById("adoptModalBtn").click();
};

const likeBtnImg = (likeImg) => {
  const imgLikeContainer = document.getElementById("likePetsSec ");

  const div = document.createElement("div");

  div.innerHTML = ` <img class="rounded-md border p-2" src="${likeImg}" alt="" />`;

  imgLikeContainer.appendChild(div);
};



// sort buitton 

let sortPet=[]

const sortButton=()=>{
  const sortedPets = sortPet.sort((a, b) => b.price - a.price); 
  displayAllPets(sortedPets);
  
}


