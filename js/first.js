

//-------------------------------------------./---------

var productNameInp = document.getElementById("productNameInp");
var productPriceInp = document.getElementById("productPriceInp");
var productCategoryInp = document.getElementById("productCategoryInp");
var productDescInp = document.getElementById("productDescInp");
var productsContainer ; 
var currentIndex = 0;

/* regular expression for name  */

var nameRegex = /^[A-Z][a-z]{5}$/;
productNameInp.addEventListener("keyup",function(){

    if(nameRegex.test(productNameInp.value)== false)
    {
            productNameInp.classList.add("is-invalid");
            productNameInp.classList.remove("is-valid");
    }else if(nameRegex.test(productNameInp.value)== true)
    {

        productNameInp.classList.add("is-valid");
        productNameInp.classList.remove("is-invalid");

    }
})

/* regular expression for price  */

var priceRegex = /^([0-2][0-9]?[0-9]?[0-9]?|3000)$/;
productPriceInp.addEventListener("keyup",function(){

    if(priceRegex.test(productPriceInp.value)== false)
    {
        productPriceInp.classList.add("is-invalid");
        productPriceInp.classList.remove("is-valid");
    }else if(priceRegex.test(productPriceInp.value)== true)
    {

        productPriceInp.classList.add("is-valid");
        productPriceInp.classList.remove("is-invalid");

    }
})


/* regular expression for Category  */

var categoryRegex = /^[A-Z]/;
productCategoryInp.addEventListener("keyup",function(){

    if(categoryRegex.test(productCategoryInp.value)== false)
    {
        productCategoryInp.classList.add("is-invalid");
        productCategoryInp.classList.remove("is-valid");
    }else if(categoryRegex.test(productCategoryInp.value)== true)
    {

        productCategoryInp.classList.add("is-valid");
        productCategoryInp.classList.remove("is-invalid");

    }
})




addBtn.addEventListener("click", function(){
    if(addBtn.innerHTML=="add")
    {
        addProduct();
    }
    else
    {
        saveUpdate();
    }
})





if(localStorage.getItem("product")== null)
{
    productsContainer = [];

}
else
{
   productsContainer = JSON.parse( localStorage.getItem("product"));
   showProduct(); 
}

function addProduct() {
    var product= 
    {
        name:productNameInp.value,
        price:productPriceInp.value,
        category:productCategoryInp.value,
        desc:productDescInp.value
    }
    productsContainer.push(product);
    /* console.log(productsContainer);
    localStorage.setItem("product",JSON.stringify(productsContainer)); */


//test
    localStorage.setItem("data","arrayOfData");
    localStorage.setItem("product", JSON.stringify( productsContainer)) ;

    showProduct(); 
  
}
function showProduct()
{
    var cartoona="";
    for(var i= 0;i<productsContainer.length;i++)
    {
        cartoona+=`<tr><td>`+i+`</td><td>`
        +productsContainer[i].name+`</td><td>`
        +productsContainer[i].price+`</td><td>`
        +productsContainer[i].category+`</td><td>`
        +productsContainer[i].desc+`</td>
        <td>`+`<button  onclick='updateProduct(`+i+`);' class ='btn btn-info' >update</button>`+`</td><td>`
        +"<button onclick='deleteProduct("+i+");' class ='btn btn-danger' >delete</button>"+`</td></tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}
/* 
function searchItem(term)
{
    var cartoona1=``;
    var cartoona2=``;
    var newResult=``;
    for(var i =0;i<productsContainer.length;i++)
    {
    
        if(productsContainer[i].name.includes(term.trim()) == true )
        {
            cartoona1+=`<tr><td>`+productsContainer[i].name+`</td><td>`
            +productsContainer[i].price+`</td><td>`
            +productsContainer[i].category+`</td><td>`
            +productsContainer[i].desc+`</td></tr>`;
            
            newResult = productsContainer[i].name.replace(term,`<span style="color: red">`+term+`</span>`) ;
            cartoona2+=`<p>`+ newResult +`</p>`;
        }
        
    }
    document.getElementById("tableBody").innerHTML = cartoona1;
    document.getElementById("searchResult").innerHTML = cartoona2;

} */
    
function searchItem(term)
{
    var cont=``;
    var cont2=``;
    var colored=``;

    for(var i = 0; i<productsContainer.length;i++)
    {
        if(productsContainer[i].name.includes(term.trim())==true)
        {
            cont +=`<tr><td>`+i+`</td><td>`+productsContainer[i].name+`</td><td>`+productsContainer[i].price+`</td><td>`
            +productsContainer[i].category+`</td><td>`+productsContainer[i].desc+`</td></tr>`;
            colored =productsContainer[i].name.replace(term,"<span style=color:red >"+term+"</span>")
            cont2= `<p>`+colored+`</p>`

        }
    }
    document.getElementById("tableBody").innerHTML = cont;
    document.getElementById("searchResult").innerHTML=cont2;
}



function deleteProduct(index)
{
    productsContainer.splice(index,1);
    localStorage.setItem("product",JSON.stringify(productsContainer));
    showProduct(); 

}
/* function updateProduct(index)
{
    currentIndex = index;
    productNameInp.value = productsContainer[index].name;
    productPriceInp.value = productsContainer[index].price;
    productCategoryInp.value = productsContainer[index].category;
    productDescInp.value = productsContainer[index].desc;
    addBtn.innerHTML = "update";  

} */

function updateProduct(index)
{
    currentIndex = index;

    addBtn.innerHTML = "update";
    productNameInp.value = productsContainer[index].name;
    productPriceInp.value = productsContainer[index].price;
    productCategoryInp.value = productsContainer[index].category;
    productDescInp.value = productsContainer[index].desc;
}
function saveUpdate()
{
    var product = 
    {
      name:productNameInp.value,
      price:productPriceInp.value,
      category:productCategoryInp.value,
      desc:productDescInp.value
    }
    productsContainer[currentIndex]=product;
    localStorage.setItem("product", JSON.stringify( productsContainer)) ;
    showProduct(); 


}