(function (core) {
    
    class User
    {
        // Getters and setters
        get DisplayName()
        {
            return this.m_displayName;
        }
        set DisplayName(name)
        {
            this.m_displayName = name;
        }
        get EmailAddress()
        {
            return this.m_emailAddress;
        }
        set EmailAddress(email_address)
        {
            this.m_emailAddress = email_address;
        }
        get Username()
        {
            return this.m_username;
        }
        set Username(username)
        {
            this.m_username = username;
        }
        get Password()
        {
            return this.m_password;
        }
        set Password(passcode)
        {
            this.m_password = passcode;
        }

        // Constructors
        constructor(displayName = "", emailAddress = "", username = "", password = "")
        {
            this.DisplayName = displayName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;
        }

        // Method overrides
        toString()
        {
            return `Display Name    : ${this.DisplayName} \nEmail Address : ${this.EmailAddress} \nUsername: ${this.Username}`;
        }

        // Utility methods
        toJSON()
        {
            return {
                "DisplayName": this.DisplayName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username
            };
        }

        fromJSON(data)
        {
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        serialize()
        {
            if(this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "")
            {
                return `${this.DisplayName},${this.EmailAddress},${this.Username}`;
            }
            else
            {
                console.error("One or more properties of the User is empty.")
                return null;
            }
        }

        deserialize()
        {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
        }
    }
    
    core.User = User;

})(core || (core = {}));