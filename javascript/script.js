const xhttp = new XMLHttpRequest();
let number = 4;                                             //number of products on a page, four by default 

let lower_price, higher_price, savings, image, name, manufacturer, markup;
const two = document.querySelector('.button--two');
const four = document.querySelector('.button--four');
const eight = document.querySelector('.button--eight');
const grid = document.querySelector('.grid');

//----------------------------------------------------------------------------------------------------------
// setup event listeners
document.querySelector('.button-row').addEventListener('click', (event) => {

  let check = event.target;
  // if BUTTON TWO was clicked
  if (check.classList.contains('button--two')) {    
    number = 2;                                            // set the number of results   
    highlightButton(number);                               // highlight corresponding button
    changeGridLayout(number);                              // adjust grid layout
    renderProducts(number);                                // render results
  }

  // if BUTTON FOUR was clicked
  else if (check.classList.contains('button--four')) {
    number = 4;
    highlightButton(number);
    changeGridLayout(number); 
    renderProducts(number);
  }

  // if BUTTON EIGHT was clicked
  else if (check.classList.contains('button--eight')) {
    number = 8;
    highlightButton(number);
    changeGridLayout(number); 
    renderProducts(number);
  }
});

//--------------------------------------------------------------------------------------------------------
// highlight button that was clicked
highlightButton = (x) => {
  if(x === 2) {
    two.classList.add("show");
    four.classList.remove("show");
    eight.classList.remove("show");
  } else if (x === 4) {
    two.classList.remove("show");
    four.classList.add("show");
    eight.classList.remove("show");
  } else if (x === 8) {
    two.classList.remove("show");
    four.classList.remove("show");
    eight.classList.add("show");
  }
};

//---------------------------------------------------------------------------------------------------------
// change grid template for specific screen width and products shown
changeGridLayout = (x) => {

  // bigger screens
  if (window.innerWidth > 700) {
    if (x === 2) {
      //grid.setAttribute("style", "grid-template-columns: 1fr 1fr;"); 
      grid.style.gridTemplateColumns = "1fr 1fr";
      //grid.setAttribute("style", "grid-template-columns: none;"); 
      grid.style.gridTemplateRows = "none";
    } else if (x === 4) {
      grid.style.gridTemplateColumns = " 1fr 1fr 1fr 1fr";
      grid.style.gridTemplateRows = "none";
    } else if (x === 8) {
      grid.style.gridTemplateColumns = " 1fr 1fr 1fr 1fr";
      grid.style.gridTemplateRows = "1fr 1fr";
    }
  // smaller screens
  } else {
    if (x === 2) {
      grid.style.gridTemplateColumns = "1fr 1fr";
      grid.style.gridTemplateRows = "none";
    } else if (x === 4) {
      grid.style.gridTemplateColumns = "1fr 1fr";
      grid.style.gridTemplateRows = "1fr 1fr";
    } else if (x === 8) {
      grid.style.gridTemplateColumns = "1fr 1fr";
      grid.style.gridTemplateRows = "1fr 1fr 1fr 1fr";
    }
  }
};

//------------------------------------------------------------------------------------------------------
// render products on screen
renderProducts = (x) => {
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      // it will give us an array of product objects
      let response = JSON.parse(xhttp.responseText);
      
      // clear grid container 
      grid.innerHTML = '';

      // display X number of products
      for (let i = 0; i < x; i++) {

        // assign product attributes to variables
        lower_price = response.list[i].price.gross.promo_float;
        higher_price = response.list[i].price.gross.base_float;
        savings = higher_price - lower_price;
        name = response.list[i].name;
        image = response.list[i].main_image;
        manufacturer = response.list[i].producer.name;

        // HTML markup for one product
        markup = `<div class="item">
                    <div class="item-row">
                        <button class="item__cart">
                            <svg>
                                <use xlink:href="sprite.svg#icon-cart"></use>
                            </svg>
                            <p>sztuk: 1</p> 
                        </button>
                        <div class="item__sale">oszczędzasz <span>${savings}zł</span></div>
                    </div>
                    <!-- -------------------------------------------------- -->
                    <img src="https://outletmeblowy.pl/environment/cache/images/300_300_productGfx_${image}.jpg" alt="Produkt" class="item__image">
                    <!-- -------------------------------------------------- -->
                    <div class="item-row item-row--close">
                        <div class="item-row__price--higher">${lower_price} zł</div>
                        <div class="item-row__price--lower">${higher_price} zł</div>
                    </div>
                    <!-- -------------------------------------------------- -->
                    <div class="item__description">${name}</div>
                    <!-- -------------------------------------------------- -->
                    <div class="item__manufacturer">Grupa ${manufacturer}</div>
                  </div>`;

        // add newly generated product into a grid
        grid.insertAdjacentHTML('beforeend', markup);
      }
    }
  };

  xhttp.open("GET", "example.json", true);
  xhttp.send();
}

//---------------------------------------------------------------------------------------------------------
// render default number of products and highlight corresponding button on page load
highlightButton(number);
changeGridLayout(number);                               
renderProducts(number); 

// document.body.addEventListener('resize',() => {
//   console.log('dziala');
//   changeGridLayout(number) ;
// });
