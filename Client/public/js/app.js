addEvents();

function addEvents() {
    // When 'click' on list button, send a '/plans' GET request and mount the html
    $( "#btnList" ).click(function() {
        // If product content is being shown, simply hide it out, no need to make a request
        if($("#productDisplay").css("display") === "block") {
            $("#productDisplay").slideUp("slow");
            return;
        }

        let url = "http://localhost:3000/plans";
        makeAjaxCall(url, "GET", null, null, function(data, textStatus) {
            // Clears previous display
            if($("#productDisplay").html != "")
                $('#productDisplay').empty();

            // Deletes unecessary attrbiutes
            delete data[0]._id;
            delete data[0].__v;

            // Creates index array to display attributes in order( name first )
            let props = [];
            for(let attr in data[0]) {
                props.push(attr);
            }
            props.unshift("name");

            // Makes product names separated by spaces ( to make them pretty )
            data.forEach(function(data) {
                data.name = data.product.split('_').join(' ');
            });

            // Creates columns container to display plans
            let display = "<div class='columns'>";
            data.forEach(function(plan) {
                display += "<div class='column is-4'><div class='plan box'>";
                props.forEach(function(attr) {
                    switch(attr) {
                        case "name":
                            display += "<h2 class='title is-capitalized'>" + plan[attr] + "</h2>";
                            break;
                        case "price":
                            display += "<p class='subtitle'>R$ " + plan[attr] + "0</p>";
                            break;
                        default:
                            display += "<p class='subtitle'>" + plan[attr] + "</p>";
                    }
                });
                // Creates form to submit to new payment page
                display += "<hr class='separator'>";
                display += 
                "<form method='GET' action='/payment/new'>" +
                    "<input type='text' class='is-hidden' name='product' value=" + plan.product + "></button>" + 
                    "<input type='text' class='is-hidden' name='price' value=" + plan.price + "></button>" + 
                    "<button type='submit' class='button is-warning is-outlined is-uppercase is-medium has-text-weight-bold'>Get this one !</button>" +
                "</form>";
                display += "</div></div>";
            });
            display += "</div>";

            $("#productDisplay").append(display)
                                .slideDown("slow");

        }, function(textStatus, errorThrown) {
            // Error, there will never be one here
        });
    });

    // When 'click' on submit button on payment form, sends a '/payment' POST request
    $("#paymentForm").submit(function( event ) {
        event.preventDefault();
        let url = "http://localhost:3000/payment";
        let data = $(this).serialize();
        makeAjaxCall(url, "POST", data, "json", function(data, textStatus, jqXHR) {
            // Displays successful notification
            displayResultMessage("is-warning", "is-success", 
                "<strong><span class='tag is-success is-capitalized'>" + textStatus + "</span></strong> :" + 
                "<p>Payment concluded</p>"
            );
        }, function(jqXHR, textStatus, errorThrown) {
            // Displays error notification
            displayResultMessage("is-success", "is-warning",
                "<strong><span class='tag is-warning'>" + jqXHR.statusText + "</span></strong> :" +  
                "<p>" + jqXHR.responseText + "</p>"
            );
        });

    });
}

/* Removes and adds classes to make display message correct according to result of ajax call */
function displayResultMessage(toRemove, toAdd, toDisplay) {
    if($("#paymentResult").html != "") {
        $('#paymentResult').empty().hide();
    }
    $("#paymentResult").append(toDisplay)   
                        .removeClass(toRemove)
                        .addClass(toAdd)
                        .fadeIn("slow"); 
}

/* Perfoms a generic jquery ajax call */
function makeAjaxCall(url, method, data, dataType, done, fail) {
    $.ajax({
        url: url,
        method: method,
        data: data,
        dataType: dataType
    })
    .done(function( data, textStatus, jqXHR ) {
        done(data, textStatus, jqXHR);
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        fail(jqXHR, textStatus, errorThrown);
    });
}