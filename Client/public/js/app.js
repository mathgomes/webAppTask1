addEvents();

function addEvents() {
    $( "#btnList" ).click(function() {

        let url = "http://localhost:3000/plans";
        makeAjaxCall(url, "GET", null, null, function(data, textStatus) {
            // Clear previous display
            if($("#productDisplay").html != "") {
                $('#productDisplay').empty();
            }
            // Delete unecessarya attrbiutes
            delete data[0]._id;
            delete data[0].__v;

            // Create index array to display attributes in order in the level( name first )
            let props = [];
            for(let attr in data[0]) {
                props.push(attr);
            }
            props.unshift("name");

            // Make product names pretty to be displayed
            data.forEach(function(data) {
                data.name = data.product
                    .split('_')
                    .map(function(word) {
                        return word[0].toUpperCase() + word.substr(1);
                    })
                    .join(' ');
            });

            // Create bulma level container
            let display = "<div class='level'>";
            data.forEach(function(plan) {
                display += "<div class='level-item has-text-centered'><div class='plan box'>";
                props.forEach(function(attr) {
                    switch(attr){
                        case "name":
                            display += "<h2 class='title'>" + plan[attr] + "</h2>";
                            break;
                        case "price":
                            display += "<p class='subtitle'>R$ " + plan[attr] + "0</p>";
                            break;
                        default:
                            display += "<p class='subtitle'>" + plan[attr] + "</p>";
                    }
                });
                // display += 
                // "<form method='GET' action='/plans'>" + 
                //     "<button type='submit' class='is-warning is-inverted'></button>" +
                // "</form>";
                display += "</div></div>";
            });

            display += "</div>";
            $("#productDisplay").append(display);
            $("#productDisplay").slideToggle( "slow");

        }, function(textStatus, errorThrown) {
            // Error, there will never be one here
        });
    });

    $("#paymentForm").submit(function( event ) {
        event.preventDefault();
        let url = "http://localhost:3000/payment";
        let data = $(this).serialize();
        makeAjaxCall(url, "POST", data, "json", function(data, textStatus, jqXHR) {
            // Display successful notification
            displayResultMessage("is-warning", "is-success", 
                "<strong><span class='tag is-success'>" + textStatus + "</span></strong> :" + 
                "<p>Payment concluded</p>"
            );
        }, function(jqXHR, textStatus, errorThrown) {
            // Display error notification
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
        $('#paymentResult').empty();
        $("#paymentResult").hide();
    }
    $("#paymentResult").append(toDisplay);
    $("#paymentResult").removeClass(toRemove);
    $("#paymentResult").addClass(toAdd);
    $("#paymentResult").fadeIn("slow"); 
}

/* Perfom a generic jquery ajax call */
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