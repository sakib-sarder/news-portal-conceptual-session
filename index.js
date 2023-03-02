const fetchCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => showCategories(data.data));
};

const showCategories = (data) => {
  // console.log(data);
  //capture categories container to append all the category links
  const categoriesContainer = document.getElementById("categories-container");
  data.news_category.forEach((singleCategory) => {
    // console.log(singleCategory);
    /* categoriesContainer.innerHTML += `
        <a class = "nav-link" href="#">${singleCategory.category_name}</a>
        ` */
    const linkContainer = document.createElement("p");
    linkContainer.innerHTML = `
        <a class = "nav-link" href="#" onclick="fetchCategoryNews('${singleCategory.category_id}','${singleCategory.category_name}')">${singleCategory?.category_name}</a>
        `;
    categoriesContainer.appendChild(linkContainer);
  });
};

//fetch all newses available in a category
const fetchCategoryNews = (category_id, category_name) => {
  const URL = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => showAllNews(data.data, category_name));
};

const showAllNews = (data, category_name) => {
  // console.log(data);
  document.getElementById("news-count").innerText = data.length;
  document.getElementById("category-name").innerText = category_name;

  const allNewsContainer = document.getElementById("all-news");
  allNewsContainer.innerHTML = "";
  data.forEach((singleNews) => {
    console.log(singleNews);
    const { image_url, title, details, author, total_view } = singleNews;
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-3");
    cardDiv.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4 ">
          <img src="${image_url}" class="img-fluid h-100 rounded-start" alt="...">
    </div> 
        <div class="col-md-8 d-flex flex-column gap-5">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${singleNews.details.slice(0, 200)}...</p>
            </div>
                <div class =" border-0 bg-body ">
                ${details.slice(0, 200)}
                 </div>
                 <div class="d-flex justify-content-between align-items-center">
                   <div class="d-flex align-items-center gap-3 ms-2">
                     <div><img style="border-radius: 50%;"  src="${
                       author.img
                     }" height="40" width="40"></div>
                     <div>
                     <p class="m-0 p-0">${author.name}</p>
                     <p class="m-0 p-0">${author.published_date}</p>
                     </div>
                     </div>
                     <div class="d-flex align-items-center gap-2">
                     <i class="fa-solid fa-eye"></i>
                     <p class="m-0 p-0">${total_view}</p>
                   </div>
                   <div></div>
                   <div></div>
                   <div></div>
                 </div>
            </div>
    </div>
        `;
    allNewsContainer.appendChild(cardDiv);
  });
};

// fetchCategories();
