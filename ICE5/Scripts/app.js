// IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function()
{
    function DisplayHomePage()
    {
        console.log("Home Page")
        let AboutUsButton = document.getElementById("AboutUsButton");
        AboutUsButton.addEventListener("click", function()
        {
            location.href = "about.html";
        });
    }
    function DisplayProducts()
    {
        console.log("Products Page");
    }
    function DisplayServicesPage()
    {
        console.log("Services Page");
    }
    function DisplayAboutPage()
    {
        console.log("About Page");
    }
    function DisplayContactPage()
    {
        console.log("Contact Page");
        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        
        sendButton.addEventListener("click", function()
        {
            if(subscribeCheckbox.checked)
            {
                
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayContactListPage()
    {

        console.log("Contact List Page");

        let addButton = document.getElementById("addButton");
        addButton.addEventListener("click", function()
        {
            location.href = "contact.html";
        });
        
        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList");

            let data = "";

            let keys = Object.keys(localStorage);
            
            let index = 1;

            // for each key in the keys string array 
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key); // get localStorage data value

                let contact = new core.Contact(); // Create an empty Contact object
                contact.deserialize(contactData);

                data += `<tr>
                    <th scope="row" class="text-center">${index}</th>
                    <td>${contact.FullName}</td>
                    <td>${contact.ContactNumber}</td>
                    <td>${contact.EmailAddress}</td>    
                    <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>         
                    <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>         
                    </tr>`;

                index++;
            }
            
            contactList.innerHTML = data;

            $("#addButton").on("click", ()=>{
                location.href = "edit.html#add";
            });

            $("button.delete").on("click", function() 
            {
                if(confirm("This action is permanent and cannot be undone. Are you sure you want to delete the item?"))
                {
                    localStorage.removeItem($(this).val());
                }
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function()
            {
                location.href = "edit.html#"+(this).val();
            });
        }
    }

    function DisplayEditPage()
    {
        console.log("Edit Page");

        ContactFormValidation();

        let page = location.hash.substring(1);
        switch(page)
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class = "fas fa-plus-circle fa-lg"></i> Add`)
                } 
                break;  
            default:

                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));
                
                $(fullName).val(contact.FullName);
                $(contactNumber).val(contact.ContactNumber);
                $(emailAddress).val(contact.EmailAddress);
                $("#editButton").on("click", event =>
                {
                    contact.FullName = $("#fullName").val();
                    contact.ContactNumber = $("#contactNumber").val();
                    contact.EmailAddress = $("#emailAddress").val();

                    //event.preventDefault();
                    localStorage.setItem(page, contact.serialize());
                    location.href = "contact-list.html";
                });
        }
    }

/**
 *  This function adds a Contact object to localStorage
 *
 * @param {string} fullName
 * @param {string} contactNumber
 * @param {string} emailAddress
 */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * This method validates a given field from in a form, 
     * and displays an error in the message area div element.
     *
     * @param {string} fieldID
     * @param {RegExp} regularExpression
     * @param {string} errorMessage
     */
    function ValidateField(fieldID, regularExpression, errorMessage)
    {
        let messageArea = $("#messageArea").hide();
        $("#" + fieldID).on("blur", function()
        {
            let textValue = $(this).val();
            if(!regularExpression.test(textValue))
            {
                // doesn't pass RegEx test
                $(this).trigger("focus"); // go back to the FullName text box
                $(this).trigger("select"); // select all the Text in the FullName text box
                messageArea.addClass("alert alert-danger"); // add the alert to the div element
                messageArea.text(errorMessage);
                messageArea.show();
            }
            else
            {
                // does pass RegEx test
                messageArea.removeAttr("class");
                messageArea.hide();
            }
        });
    }

    function ContactFormValidation()
    {
        ValidateField("fullName",/^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/,"Please enter a valid Full Name. This must include at least a Capitalized First Name and a Capitalized Last Name.");
        ValidateField("contactNumber",/(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/, "Please enter a valid Contact Number. Example: (416) 555-5555");
        ValidateField("emailAddress",/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}/,"Please enter a valid Email Address. Example: Example_Email@hotmail.com");
    }

    function Start()
    {
        console.log("App Started!");
        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProducts();
                break;    
            case "Our Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }

    };

    window.addEventListener("load", Start());
})();