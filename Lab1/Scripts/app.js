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

        // Create reference to entry point for insertion/deletion
        let MainContent = document.getElementsByTagName("main")[0];

        // Create HTML Element in memory
        let MainParagraph = document.createElement("p");

        // Configure the created Element
        MainParagraph.innerHTML = `<p id="MainParagraph" class="h5 mt-3 "> Welcome to my Lab 1 site.<br>Enjoy your stay!</a>`
       
        // Insert new element into the reference point
        MainContent.appendChild(MainParagraph);
    }
    function DisplayProducts()
    {
        console.log("Products Page");
        document.getElementById("PageTitle").innerHTML = `<i class="fas fa-hat-wizard"></i> Previous Projects`;

        // Create reference to entry point for insertion/deletion
        let MainContent = document.getElementsByTagName("main")[0];
        console.log(MainContent);

        // Create HTML Element in memory
        let MainParagraph = document.createElement("p");
        let FirstPicture = document.createElement("div");
        let FirstParagraph = document.createElement("p");
        let SecondParagraph = document.createElement("p");
        let ThirdParagraph = document.createElement("p");

        // Configure the created Element
        MainParagraph.innerHTML = `<p id="MainParagraph" class="h5 mt-3 "> This page displays my favourite projects that I have worked on.</a>`
        FirstPicture.innerHTML = `<img src="./Images/Project.PNG" alt="This Project"  width="700" height="400">`;
        FirstParagraph.innerHTML=  `<p class="h7 mt-3 ">This website, made using HTML, Javascript and Node has been thoroughly enjoyable, 
                                    <br>and I have learned alot from it due to my profs enjoyable teaching style (Not trying to get 
                                    <br>brownie points I legitimately feel this way lol).</p>`;
        SecondParagraph.innerHTML=  `<p class="h7 mt-3 ">Another Project I enjoyed working on was my first attempt to recreate the once 
                                    <br>very popular game "Tetris". It was a project I attempted before beginning college, and failed 
                                    <br>disasterously, but I learned alot on how Object Oriented Programming works, and had I have had 
                                    <br>the time, I believe I would have completed it once restarting.</p>`;
        ThirdParagraph.innerHTML=  `<p class="h7 mt-3 ">A project I did not explicitly enjoy doing, but was proud of the end result 
                                    <br>was my WEBD-3201 website. It was a painful journey but it ended up working exactly how I had
                                    <br>wanted, and looked in my opinion quite stunning, unfortunately I have no pictures of the end result/p>`;
                
        // Insert new element into the reference point
        MainContent.appendChild(MainParagraph);  
        MainContent.appendChild(FirstPicture);     
        MainContent.appendChild(FirstParagraph);  
        MainContent.appendChild(SecondParagraph); 
        MainContent.appendChild(ThirdParagraph);  
    }

    function DisplayServicesPage()
    {
        console.log("Services Page");
        // Create reference to entry point for insertion/deletion
        let MainContent = document.getElementsByTagName("main")[0];

       // Create HTML Element in memory
       let MainParagraph = document.createElement("p");
       let FirstParagraph = document.createElement("p");
       let SecondParagraph = document.createElement("p");
       let ThirdParagraph = document.createElement("p");

       // Configure the created Element
        MainParagraph.innerHTML = `<p id="MainParagraph" class="h5 mt-3 "> These are the 3 best things that set us apart from many.</a>`
        FirstParagraph.innerHTML=  `<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                    Our programmers are skilled with many different types of programming languages, some of which
                                    <br>being, C++, C#, Java, JavaScript, SQL, PHP, HTML, Python, COBOL. As such we are skilled in
                                    <br>many different regions of programming and give you the best options for what you are looking for.</p>`;
        SecondParagraph.innerHTML=  `<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                    We look to give a one on one experience with any clients we accumulate, and strive to give you 
                                    <br>what your looking for in your website. Whether it be design or functionality, I am certain 
                                    <br>we will give you what your looking for through our personal touch and details.</p>`;
        ThirdParagraph.innerHTML=  `<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                    We are very detail oriented, and find ourselves unable to sleep with details on our minds,
                                    <br>and as such, we can assure you that you will get the best product we can come up with.</p>`;
               
       // Insert new element into the reference point
       MainContent.appendChild(MainParagraph);    
       MainContent.appendChild(FirstParagraph);  
       MainContent.appendChild(SecondParagraph); 
       MainContent.appendChild(ThirdParagraph);  
    }
    function DisplayAboutPage()
    {
        console.log("About Page");
        // Create reference to entry point for insertion/deletion
        let MainContent = document.getElementsByTagName("main")[0];

        // Create HTML Element in memory
        let MainParagraph = document.createElement("p");

        // Configure the created Element
        MainParagraph.innerHTML = `<p id="MainParagraph" class="h5 mt-3 "> Welcome to my Lab 1 site.<br>Enjoy your stay!</a>`
       
        // Insert new element into the reference point
        MainContent.appendChild(MainParagraph);
    }
    function DisplayContactPage()
    {
        console.log("Contact Page");

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
                location.href = "edit.html#"+ $(this).val();
            });
        }
    }

    function DisplayEditPage()
    {
        console.log("Edit Page");

        let page = location.hash.substring(1);

        console.log(page);

        switch(page)
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`)

                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                }
                break;
            default:
                {
                    // get contact info from localStorage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));

                    // display the contact in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();
                        
                        // get changes from the page
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();

                        // replace the item in local storage
                        localStorage.setItem(page, contact.serialize());
                        // go back to the contact list page (refresh)
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                    
                }
                break;
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

    

    function Start()
    {
        console.log("App Started!");

        let NavContent = document.getElementsByTagName("ul")[0];
        let HumanResourceLink = document.createElement("li");
        HumanResourceLink.innerHTML = `<a class="nav-link"><i class="fas fa-user"></i> Human Resources</a>`
        NavContent.lastElementChild.before(HumanResourceLink);
        NavContent.childNodes[3].innerHTML=`<a class="nav-link" href="products.html"><i class="fas fa-boxes"></i> Projects</a>`
        console.log("NavContent changed");


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
            case "Contact-List":
                DisplayContactListPage();
                break;
            case "Edit":
                DisplayEditPage();
                break;
        }

    };

    window.addEventListener("load", Start());
})();