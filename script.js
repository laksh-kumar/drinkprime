
    
    function addtocart(pid, pname, ppic)
    {
        
        let cart = localStorage.getItem("cart");

        if(cart==null){
            let products = [];
            let product = {productId: pid, productName: pname, productPic: ppic, productQuantity: 1};
            products.push(product)
            localStorage.setItem("cart", JSON.stringify(products));
            console.log("Product added for first time")
   
        } else
        {
            let pcart = JSON.parse(cart);
            let oldProduct = pcart.find((item) => item.productId == pid)
            
            
            if(oldProduct)
            {

                //Increase the quantity of the product if it is added to cart again
                oldProduct.productQuantity = oldProduct.productQuantity+1;

                pcart.map((item)=>{

                    if(item.productId==oldProduct.productId)
                    {
                        item.productQuantity = oldProduct.productQuantity;
                    }
                
                
                })
                
                localStorage.setItem("cart", JSON.stringify(pcart));
                console.log("Quantity increased")

            } else
            {

                //Add product
                let product = {productId: pid, productName: pname, productPic: ppic, productQuantity: 1};
                pcart.push(product)
                localStorage.setItem("cart", JSON.stringify(pcart));
                console.log("Another Product Added")
            }
        
        
        
        
        
        }

        updateCart();


    }




    function updateCart()
    {
        let cartString = localStorage.getItem("cart");
        let cart = JSON.parse(cartString);

        if(cart == null || cart.length == 0)
        {
            //Empty Cart

            console.log("cart is empty")
            $(".cart-items").html("");
            $(".cart-body").html("<h3 style= 'padding: 5px 10px;'> Your Cart is empty </h3>");
            $(".checkout").hide();
            $(".checkout-btn").html("<a href='products.html' style= 'text-decoration: none; color: white; font-size: 15px;'>Shop Here</a>")
        }else
        {
            // SOme Stuff
            console.log(cart);
            $(".cart-items").html(`( ${cart.length} )`);


            let table = `
                <table class='table' style="table-layout= fixed;">
                <thead class = 'thead'>
            
                    <tr>
                        <th></th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th></th>

                    </tr>



                </thead>
            `;






            let totalPrice = 0;
            cart.map((item)=>{

                table +=`
                    <tr>
                        <td><img src="images/${item.productPic}" alt="" style="width: 10%;">${item.productName} </td>
                        <td>$29</td>
                        <td>${item.productQuantity}</td>
                        <td>$ ${item.productQuantity*29}</td> 
                        <td><button class="btn btn-danger btn-sm" onclick='deleteItem(${item.productId})'>Remove</button></td>
                    </tr>
                
                
                `

                    totalPrice+= 29 * item.productQuantity;


            })

            table = table + `
                <tr><td style=" font-weight: bold; font-size: 20px; padding-left: 20px !important;">Total:</td>
                <td></td>
                <td></td>
                <td style=" font-weight: bold; font-size: 17px;" class="totalprice">$ ${totalPrice}</td>
                <td></td>
                </tr>
            </table>`

            $(".cart-body").html(table);

        }

       

    }

    
    
    function deleteItem(pid)
    {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let newcart = cart.filter((item)=> item.productId!=pid)
        localStorage.setItem('cart', JSON.stringify(newcart));
        updateCart()
    }
    
    
    
    
    
    
    $(document).ready(function(){
        updateCart();
    })







function placeOrder(){
    localStorage.clear();
}




















