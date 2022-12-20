const url = "https://www.themealdb.com/api/json/v1/1/categories.php"

document.addEventListener('DOMContentLoaded', (e) =>{
    e.preventDefault()
    const containerFluid = document.getElementById('container')

    const navbar = document.getElementById('navBar')
    
    const signUp = document.getElementById('sign-up')
   

    const signIn = document.getElementById('sign-in')
    // const landingPage = document.getElementById('landingPage')
    // const loginBtn = document.getElementById('btnLog')

    // loginBtn.addEventListener('click', (e) =>{
    //     //  console.log()
    //  e.preventDefault
    //  signIn.style.display = "none"
    //     signUp.style.display = "flex"
    //     signUp.removeAttribute("hidden")
    //     landingPage.style.display = 'none'


    // })
    
    const btnSignUp = document.getElementById('btnSignUp')
         btnSignUp.addEventListener('click', (e) => {
            e.preventDefault()
            signIn.style.display = "flex"
            signIn.removeAttribute("hidden")
            signUp.style.display = "none"
            containerFluid.style.display = "none"
            navbar.style.display = "none"
         })
    const searchBtn = document.getElementById('btnSearch')
    searchBtn.addEventListener('click', (e) =>{
        e.preventDefault()
        signIn.style.display = "none"
        signUp.style.display = "none"
        
        containerFluid.removeAttribute('hidden')
        containerFluid.style.display = 'flex'
        navbar.removeAttribute('hidden')
        navbar.style.display ='flex '
    })
    const btnLogin = document.getElementById('btnLogin')
    btnLogin.addEventListener('click', (e) =>{
        e.preventDefault()
        signIn.style.display = "none"
        signUp.style.display = "none"
        
        containerFluid.removeAttribute('hidden')
        containerFluid.style.display = 'flex'
        navbar.removeAttribute('hidden')
        navbar.style.display ='flex '

    })

    
    const fetchFirstStr = () => {
        fetch(url)
        .then(response => response.json())
        .then(str => renderFirstStr(str.categories[0])
        )
        // console.log(str)

    }
     fetchFirstStr();



function renderFirstStr(str) {

    let button = document.getElementById('button')
    button.innerHTML=""

    const strCategoryDescription = document.getElementById('descript')
    strCategoryDescription.innerText = str.strCategoryDescription

    const img = document.getElementById('img')  
    img.innerHTML = `
    
    <img src="${str.strCategoryThumb}"id="image"  class="img-thumbnail" alt="...">`

}

const strCategories = () => {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        data.categories.forEach(str=> {
            const titles = str.strCategory
            // console.log(titles)
            const newTitles = document.createElement('li')
            const titleList = document.getElementById('titleList')
            newTitles.innerHTML = `${titles}`
            titleList.appendChild(newTitles)
        })
    })
}
strCategories()

function strMealCategories(){
    const titleList = document.getElementById('titleList')
    titleList.addEventListener('click', (e) => {
        fetch(url)
        .then((resp) => resp.json())
        .then((item) => {
            item.categories.forEach(menu =>{
               if( e.target.innerHTML === menu.strCategory){
                console.log(menu.strCategory);
              const img = document.getElementById('img')  
              img.innerHTML = `
              <img src="${menu.strCategoryThumb}"id="image"  class="img-thumbnail" alt="...">
                `
                const description = document.getElementById('descript')
                description.innerHTML = `${menu.strCategoryDescription}`
               }
            })
            
        })

    })
}
 strMealCategories();

 //add a search function
 
 const searchInput = document.getElementById('input')

 searchBtn.addEventListener('click' , (e) => {
    e.preventDefault
    const userInput = searchInput.value
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${userInput}`)
    .then((resp) => resp.json())
    .then((item) => {
        // console.log(item)
    item.meals.forEach(newItem => {

        const img = document.getElementById('img')  
              img.innerHTML = `
              <img src="${newItem.strMealThumb}" id="image" class="img-thumbnail" alt="...">
                `
                const description = document.getElementById('descript')
                description.innerHTML = `${newItem.strInstructions}`

            const titleList = document.getElementById('titleList')
            titleList.innerHTML = `
            <p>CATEGORY: ${newItem.strCategory}</p>
             <p>MEAL: ${newItem.strMeal}</p>
            `
            

        // console.log(newItem)
        

     
     })
     

})
 })


function updateMealSearch(obj) {

    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php/${obj.id}`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(data =>{ console.log(data)})
}
})