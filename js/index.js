const url = "https://www.themealdb.com/api/json/v1/1/categories.php"

document.addEventListener('DOMContentLoaded', (e) =>{
    e.preventDefault()
    const containerFluid = document.getElementById('container')

    const navbar = document.getElementById('navBar')
    
    const signUp = document.getElementById('sign-up')
   

    const signIn = document.getElementById('sign-in')
    
    const btnSignUp = document.getElementById('btnSignUp')
         btnSignUp.addEventListener('click', (e) => {
            e.preventDefault()
            signIn.style.display = "flex"
            signIn.removeAttribute("hidden")
            signUp.style.display = "none"
            containerFluid.style.display = "none"
            navbar.style.display = "none"
         })

    const btnLogin = document.getElementById('btnLogin')
    btnLogin.addEventListener('click', (e) =>{
        e.preventDefault()
        signIn.style.display = "none"
        signUp.style.display = "none"
        // const containerFluid = document.getElementById('container')
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
    
    <img src="${str.strCategoryThumb}" class="img-thumbnail" alt="...">`


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
              <img src="${menu.strCategoryThumb}" class="img-thumbnail" alt="...">
                `
                const description = document.getElementById('descript')
                description.innerHTML = `${menu.strCategoryDescription}`
               }
            })
            
        })

    })
}
 strMealCategories();
// const strCategories = () => {
    
//     fetch("https://www.themealdb.com/api/json/v1/1/categories.php"
//     )
//     .then((resp) => resp.json())
//     .then((str) => {
//         console.log(str)
//         str.categories.forEach(item => {
//          console.log(item)

//             let titles = document.createElement("li")
//             titles.addEventListener('click', () =>{

//                 console.log("I was clicked")

//                 const i= item.id
//                 renderStrCategories(str.categories[i - 1])

//             })
//             titles.innerText = item.title
//             let menuList = document.getElementById('mealCategory')
//             menuList.appendChild(titles)
//         })

//     })
// }
// strCategories();



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