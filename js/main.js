// Initialize the Ajax request
(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json');
    // Track the state changes of the request
    xhr.onreadystatechange = function () {
        // Ready state 4 means the request is done
        if (xhr.readyState === 4) {
            // 200 is a successful return
            if (xhr.status === 200 || xhr.status === 0) {
                var myJsonObj = xhr.responseText;
                var jsonObj = JSON.parse(myJsonObj);
                
                // Product title
                var title = document.querySelector("h1");
                var name = document.createTextNode(jsonObj.name);
                title.appendChild(name);

                // Product price
                var price = document.querySelector(".price");
                var localPrice = document.createTextNode(geoplugin_currencyConverter(jsonObj.price, false));
                var symbol = document.createTextNode(geoplugin_currencySymbol_UTF8());
                price.appendChild(symbol);
                price.appendChild(localPrice);
          
                // Product image
                var pImage = document.querySelector(".product-image");
                pImage.setAttribute("src", jsonObj.url);

                // Product paragraph
                var description = document.querySelector(".description");
                var paragraph = document.createTextNode(jsonObj.paragraph);
                description.appendChild(paragraph);

                // Paragraph link
                var link = document.querySelector(".paragraph-link");
                link.setAttribute("href", jsonObj.plink);

                // Web link
                var webLink = document.querySelector(".web-link");
                webLink.setAttribute("href", jsonObj.weblink);

               // Calculate total price
                var btnClick = document.querySelector(".checkout-button");
                btnClick.addEventListener("click", ButtonClick, false);

                function ButtonClick() {
                    var quantity = document.querySelector("#txt_quantity").value;
                    var totalSum = document.querySelector(".final-sum");
                    var sum = document.createTextNode(geoplugin_currencyConverter(jsonObj.price, false) * quantity);
                    var symbol = document.createTextNode(geoplugin_currencySymbol_UTF8());
                    
                    // Delete total price if there's one
                    while(totalSum.firstChild) {
                        totalSum.removeChild(totalSum.firstChild);
                    }

                    // Append total price
                    var total = document.createTextNode("Total: ");
                    totalSum.appendChild(total);
                    totalSum.appendChild(symbol);
                    totalSum.appendChild(sum); 
                }
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    }
    // Send the request
    xhr.send(null);
})();