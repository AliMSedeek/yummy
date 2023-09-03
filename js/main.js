// start nav animation, open, close side-nav and links animation //
function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})
// end nav animation //


// display some random meals by search Api ==> appear first on opening the website //
let Row = document.getElementById("Row");
let allMeals = [];
async function showMeals()
{
    let meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    let response  = await meals.json()
    allMeals = response.meals
    displayMeals(allMeals)
}
showMeals()

function displayMeals(arr) 
{
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) 
    {
        cartoona += `
        <div class="gallery-pic col-3 mt-4">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-3 cursor-pointer parent-overlay">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 child-overlay rounded-3">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    Row.innerHTML = cartoona
}
// end random searched meals functions //


// All categories functions //
let categoryLink = document.getElementById('categoryLink')
categoryLink.addEventListener('click', function(){
    showCategories()
    closeSideNav()
})

let allCategories = []
async function showCategories() 
{
    searchContainer.innerHTML = ""
    Row.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    allCategories = response.categories
    displayCategories(allCategories)
}

function displayCategories(arr) 
{
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="gallery-pic col-3 mt-4">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-3 cursor-pointer class="parent-overlay"">
                    <img class="w-100 rounded-3" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2 child-overlay rounded-3">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    Row.innerHTML = cartoona
}

async function getCategoryMeals(category) 
{
    searchContainer.innerHTML = ""
    Row.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    let categoryMeals = response.meals.slice(0,20)
    displayMeals(categoryMeals)
}
// end all categories functions //


// display all areas functions //
let areaLink = document.getElementById('areaLink')
areaLink.addEventListener('click', function(){
    showArea()
    closeSideNav()
})

let allAreas = []
async function showArea() 
{
    searchContainer.innerHTML = ""
    Row.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    allAreas = respone.meals
    displayArea(allAreas)
}

function displayArea(arr) 
{
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-3 mt-4 text-white text-center">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    Row.innerHTML = cartoona
}

async function getAreaMeals(area) 
{
    searchContainer.innerHTML = ""
    Row.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    let AreaMeals = response.meals.slice(0, 20)
    displayMeals(AreaMeals)
}
// end all areas functions //


// display all ingrediants functions //
let ingredientsLink = document.getElementById('ingredientsLink')
ingredientsLink.addEventListener('click', function(){
    showIngredients()
    closeSideNav()
})

let allIngredients = []
async function showIngredients() 
{
    searchContainer.innerHTML = ""
    Row.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    allIngredients = respone.meals.slice(0, 20)
    displayIngredients(allIngredients)
}

function displayIngredients(arr) 
{
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) 
    {
        cartoona += `
        <div class="col-3 mt-5 text-white text-center">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }
    Row.innerHTML = cartoona
}

async function getIngredientsMeals(ingredients) 
{
    searchContainer.innerHTML = ""
    Row.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    let IngredientsMeals = response.meals.slice(0, 20)
    displayMeals(IngredientsMeals)
}
// end all Ingredients functions //


// show each meal ingredients //
let mealDetails = []
async function getMealDetails(mealID) 
{
    closeSideNav()
    searchContainer.innerHTML = "";
    Row.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    mealDetails = respone.meals[0]
    displayMealDetails(mealDetails)
}

function displayMealDetails(meal) 
{
    // make a loop on the ingredients, max 20 ingredients //
    let ingredients = ``
    for (let i = 1; i <= 20; i++) 
    {
        if (meal[`strIngredient${i}`]) 
        {
            // make a list, containing each ingredient with its measure //
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
   
    let cartoona = `
            <div class="close-meal d-flex justify-content-end"><a href="Home.html"><i class="fa fa-window-close text-white fa-2x" aria-hidden="true"></i></a></div>
            <div class="col-md-4 text-center text-white">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions.split(" ").slice(0,160).join(" ")}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
            </div>
            
            <div class="col-md-8 text-white">
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
                </ul>

            </div>
            <div class="col-md-4 text-center text-white">
                <h3>Tags :</h3>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
            
            `

    Row.innerHTML = cartoona
}
// end each meal ingredient //


// search inputs, search by name and search by first letter //
let searchContainer = document.getElementById("searchContainer");
let searchLink = document.getElementById('searchLink')
searchLink.addEventListener('click', function(){
    showSearchInputs()
    closeSideNav()
})

// function to show the two search inputs //
function showSearchInputs() 
{
    Row.innerHTML = ""
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white searchInput" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white searchInput" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
}

// function to search by name //
let searchName = []
async function searchByName(word) 
{
    // closeSideNav()
    Row.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
    response = await response.json()
    searchName = response.meals
    if(searchName)
    {
        displayMeals(searchName)
    }
    else
    {
        displayMeals([])
    }
    
}

// function to search by first letter only //
let searchLetter
async function searchByFLetter(letter) 
{
    // closeSideNav()
    Row.innerHTML = ""
    letter == "" ? letter = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()
    let searchLetter = response.meals
    // response.meals ? displayMeals(searchLetter) : displayMeals([])
    if(searchLetter)
    {
        displayMeals(searchLetter)
    }
    else
    {
        displayMeals([])
    }
}
// end search items //


// start contact section //
let contactLink = document.getElementById('contactLink')
contactLink.addEventListener('click', function(){
    closeSideNav()
    showContacts()
})

function showContacts() 
{
    searchContainer.innerHTML = ""
    Row.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
}

// regex functions //
function nameValidation() 
{
    let nameInput = document.getElementById("nameInput")
    return (/^[a-zA-Z ]+$/.test(nameInput.value))
}

function emailValidation() 
{
    let emailInput = document.getElementById("emailInput")
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value))
}

function phoneValidation() 
{
    let phoneInput = document.getElementById("phoneInput")
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneInput.value))
}

function ageValidation() 
{
    let ageInput = document.getElementById("ageInput")
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value))
}

function passwordValidation() 
{
    let passwordInput = document.getElementById("passwordInput")
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value))
}

function repasswordValidation() 
{
    let repasswordInput = document.getElementById("repasswordInput")
    return repasswordInput.value == passwordInput.value
}
// end regex functions //

// add and remove alert divs based on validation //
function inputsValidation() 
{
    // get alert divs by id //
    let nameAlert = document.getElementById("nameAlert")
    let emailAlert = document.getElementById("emailAlert")
    let phoneAlert = document.getElementById("phoneAlert")
    let ageAlert = document.getElementById("ageAlert")
    let passwordAlert = document.getElementById("passwordAlert")
    let repasswordAlert = document.getElementById("repasswordAlert")
    

    if(nameValidation()) 
    {
        nameAlert.classList.replace("d-block", "d-none")
    } 
    else 
    {
        nameAlert.classList.replace("d-none", "d-block")
    }
   
    if(emailValidation()) 
    {
        emailAlert.classList.replace("d-block", "d-none")
    } 
    else 
    {
        emailAlert.classList.replace("d-none", "d-block")
    }
    
    if(phoneValidation()) 
    {
        phoneAlert.classList.replace("d-block", "d-none")
    } 
    else 
    {
        phoneAlert.classList.replace("d-none", "d-block")
    }
    
    if(ageValidation()) 
    {
        ageAlert.classList.replace("d-block", "d-none")
    } 
    else 
    {
        ageAlert.classList.replace("d-none", "d-block")
    }
   
    if(passwordValidation()) 
    {
        passwordAlert.classList.replace("d-block", "d-none")
    } 
    else 
    {
        passwordAlert.classList.replace("d-none", "d-block")
    }
    
    if(repasswordValidation()) 
    {
        repasswordAlert.classList.replace("d-block", "d-none")
    } 
    else 
    {
        repasswordAlert.classList.replace("d-none", "d-block")
    }


    if (nameValidation() && emailValidation() && phoneValidation() &&
        ageValidation() && passwordValidation() && repasswordValidation()) 
    {
        submitBtn.removeAttribute("disabled")
    } 
    else 
    {
        submitBtn.setAttribute("disabled", true)
    }
}
// end validation //