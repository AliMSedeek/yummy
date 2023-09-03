// let rowData = document.getElementById("Row");
// // let searchContainer = document.getElementById("searchContainer");
// // let submitBtn;


// function openSideNav() {
//     $(".side-nav-menu").animate({
//         left: 0
//     }, 500)


//     $(".open-close-icon").removeClass("fa-align-justify");
//     $(".open-close-icon").addClass("fa-x");


//     for (let i = 0; i < 5; i++) {
//         $(".links li").eq(i).animate({
//             top: 0
//         }, (i + 5) * 100)
//     }
// }

// function closeSideNav() {
//     let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
//     $(".side-nav-menu").animate({
//         left: -boxWidth
//     }, 500)

//     $(".open-close-icon").addClass("fa-align-justify");
//     $(".open-close-icon").removeClass("fa-x");


//     $(".links li").animate({
//         top: 300
//     }, 500)
// }

// closeSideNav()
// $(".side-nav-menu i.open-close-icon").click(() => {
//     if ($(".side-nav-menu").css("left") == "0px") {
//         closeSideNav()
//     } else {
//         openSideNav()
//     }
// })




// function displayMeals(arr) {
//     let cartoona = "";

//     for (let i = 0; i < arr.length; i++) {
//         cartoona += `
//         <div class="col-md-3">
//                 <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
//                     <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
//                     <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
//                         <h3>${arr[i].strMeal}</h3>
//                     </div>
//                 </div>
//         </div>
//         `
//     }

//     rowData.innerHTML = cartoona
// }


// async function showCategories() {
//     rowData.innerHTML = ""

//     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
//     response = await response.json()

//     displayCategories(response.categories)

// }

// function displayCategories(arr) {
//     let cartoona = "";

//     for (let i = 0; i < arr.length; i++) {
//         cartoona += `
//         <div class="col-md-3">
//                 <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
//                     <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
//                     <div class="meal-layer position-absolute text-center text-black p-2">
//                         <h3>${arr[i].strCategory}</h3>
//                         <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
//                     </div>
//                 </div>
//         </div>
//         `
//     }

//     rowData.innerHTML = cartoona
// }

// async function getCategoryMeals(category) 
// {
//     rowData.innerHTML = ""

//     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
//     response = await response.json()

//     displayMeals(response.meals.slice(0, 20))

// }