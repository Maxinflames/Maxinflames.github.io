// IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function()
{
    /**
     * This function uses AJAX to open a connection to the server and returns 
     * the data payload to the callback function
     *
     * @param {string} method
     * @param {string} url
     * @param {function} callback
     */
    function AjaxRequest(method, url, callback)
    {
        // AJAX STEPS
        // Step 1. - instantiate an XHR Object
        let XHR = new XMLHttpRequest();

        // Step 2. - add an event listener for readystatechange
        XHR.addEventListener("readystatechange", () =>
        {
            if(XHR.readyState === 4 && XHR.status === 200)
            {
                if(typeof callback === "function")
                {
                    callback(XHR.responseText);
                }
                else
                {
                    console.error("ERROR: callback not a function");
                }
            }
        });

        // Step 3. - Open a connection to the server
        XHR.open(method, url);

        // Step 4. - Send the request to the server
        XHR.send();
    }

    /**
     * This function loads the header.html content into a page
     *
     * @param {string} html_data
     */
    function LoadHeader(html_data)
    {
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active"); // update active link
        checkLogin();
    }

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
        if(sessionStorage.getItem("user"))
        {
            // Set contact-list-btn to be visible if user is logged in
            $("#contactList").show(); 
        }
        else
        {
            // Set contact-list-btn to be invisible if user is not logged in
            $("#contactList").hide();
        }
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
        if(sessionStorage.getItem("user"))
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
                    location.href = "edit.html#"+ $(this).val();
                });
            }
            $("#addButton").on("click", ()=>{
                location.href = "edit.html#add";
            });
        }
        else
        {
            location.href = "login.html";
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

    function DisplayRegisterPage()
    {
        console.log("Register Page");

        // Creating the ErrorMessage element for any errors to be displayed to user
        let MainContent = $("#contentArea");
        let ErrorDiv = document.createElement("div");
        ErrorDiv.setAttribute("id", "ErrorMessage");
        ErrorDiv.setAttribute("class","alert alert-danger");
        ErrorDiv.style.display= "none";
        MainContent.prepend(ErrorDiv);

        RegisterFormValidation();
        $("#submitButton").on("click", function()
        {
            event.preventDefault();

            let success = false;

            // Create an empty user object
            //let newUser = new core.User();

            RegisterFormValidation();
            let messageArea = $("#ErrorMessage");
            if(messageArea.text(ErrorMessage)== "")
            {
                ConfirmPassword();
                console.log("Here");
            }
        });
    }

    
    function DisplayLoginPage()
    {
        console.log("Login Page");
        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function()
        {
            let success = false;

            // Create an empty user object
            let newUser = new core.User();

            // uses jQuery shortcut to load the users.json file
            $.get("./Data/users.json", function(data)
            {
                // for every user in the users.json file
                for (const user of data.users) {
                    // check if the username and password entered in the form matches the user
                    if(username.value == user.Username && password.value == user.Password)
                    {
                        // Get user data from the file and assign it to empty user object
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                // If the username and password matches - success... then perform the login sequence
                if(success)
                {
                    // add user to session storage
                    sessionStorage.setItem("user", newUser.serialize());

                    // hide any error messages
                    messageArea.removeAttr("class").hide();

                    // Redirect user to secure area of the site - contact-list.html
                    location.href="contact-list.html";
                }
                // Else if bad credentials were entered...
                else
                {
                    // display an error message
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Information").show();
                }
            });
        });

        $("#cancelButton").on("click", function()
        {
            // Clear Login form
            document.forms[0].reset();

            // return to home page
            location.href = "index.html";

        });
    }

    function checkLogin()
    {
        // if user is logged in
        if(sessionStorage.getItem("user"))
        {
            // swap out the login link for logout
            $("#login").html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            );
            
            $("#logout").on("click", function()
            {
                // perform logout
                sessionStorage.clear();

                // redirect back to login
                location.href = "login.html";
            });
            
            let NavContent = document.getElementsByTagName("ul")[0];
            let NavDisplayUsername = document.createElement("li");
            tempString = sessionStorage.getItem("user").substring(0, sessionStorage.getItem("user").indexOf(','))
            NavDisplayUsername.innerHTML = `<a class="nav-link"><i class="fas fa-user"></i> `+ tempString +`</a>`
            NavContent.lastElementChild.before(NavDisplayUsername);
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
    function ValidateContactField(fieldID, regularExpression, errorMessage)
    {
        let messageArea = $("#messageArea").hide();
        $("#" + fieldID).on("blur", function()
        {
            let textValue = $(this).val();
            if(!regularExpression.test(textValue))
            {
                // Doesn't pass RegEx test
                $(this).trigger("focus"); // go back to the FieldID text box
                $(this).trigger("select"); // select all the Text in the FieldID text box
                messageArea.addClass("alert alert-danger"); // add the alert to the div element
                messageArea.text(errorMessage);
                messageArea.show();
            }
            else
            {
                // Does pass RegEx test
                messageArea.removeAttr("class");
                messageArea.hide();
            }
        });
    }

    function ContactFormValidation()
    {
        ValidateContactField("fullName",/^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/,"Please enter a valid Full Name. This must include at least a Capitalized First Name and a Capitalized Last Name.");
        ValidateContactField("contactNumber",/(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/, "Please enter a valid Contact Number. Example: (416) 555-5555");
        ValidateContactField("emailAddress",/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}/,"Please enter a valid Email Address. Example: Example_Email@hotmail.com");
    }

    function ValidateRegisterField(fieldID, regularExpression, errorMessage)
    {
        let messageArea = $("#ErrorMessage").hide();
        $("#" + fieldID).on("blur", function()
        {
            let textValue = $(this).val();
            if(!regularExpression.test(textValue))
            {
                messageArea.text(errorMessage);
                messageArea.show();
                // doesn't pass RegEx test
                $("#" + fieldID).trigger("focus"); // go back to the FieldID text box
                $("#" + fieldID).trigger("select"); // select all the Text in the FieldID text box
            }
            else
            {
                // does pass RegEx test
                messageArea.hide();
            }
        });
    }
    /**
     * 
     */
    function ConfirmPassword()
    {
        let messageArea = $("#ErrorMessage").show();
        // Checks if the passwords values are not equal
        if ($("#password").value != $("#confirmPassword").value)
        {
            $("#password").trigger("focus"); // go back to the FieldID text box
            $("#password").trigger("select"); // select all the Text in the FieldID text box
            messageArea.text("Passwords do not match. Please try again.");
        }
        else
        {
            messageArea.hide();
        }
        
        console.log("did");
    }

    function RegisterFormValidation()
    {
        ValidateRegisterField("firstName",/^([A-Z][a-z]{1,})$/,"Please enter a valid First Name. A valid First name begins with a capital, and has at least 2 characters.");
        ValidateRegisterField("lastName",/([A-Z][a-z]{1,})$/,"Please enter a valid Last Name. A valid Last name begins with a capital, and has at least 2 characters.");
        ValidateRegisterField("emailAddress",/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}/,"Please enter a valid Email Address. Example: Example_Email@hotmail.com");
        ValidateRegisterField("password",/[a-zA-Z0-9.-/!@#$%^&*(){}\[\]\\,.';|":><?\`~\s_+-=]{6,}/,"Please enter a valid Password. Valid Passwords have a minimum of 6 characters.");
    }

    function Start()
    {
        console.log("App Started!");

        AjaxRequest("GET", "header.html", LoadHeader);

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