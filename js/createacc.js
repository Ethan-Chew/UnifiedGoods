document.addEventListener("DOMContentLoaded", function() {  
    const APIKEY = "65a398e2c69bc871e5f5e224"
    const APIURL = "https://fedassignment-6326.restdb.io/rest/shopusers"

    // Wait for Form Creation onSubmit
    document.getElementById("create-form").addEventListener("submit", function (e) {
        e.preventDefault()

        const errorField = document.getElementById("err-msg")

        // Get data from form
        const firstName = document.getElementById("first-name").value
        const lastName = document.getElementById("last-name").value
        const username = document.getElementById("username").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const confirmPassword = document.getElementById("confirmPassword").value
        
        if (password !== confirmPassword) {
            errorField.innerText = "Error: Passwords must match!"
        } else {
            const jsonData = {
                name: firstName + lastName,
                username: username,
                email: email,
                password: password,
                cart: [],
                points: 0
            }

            const settings = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-apikey": APIKEY,
                },
                body: JSON.stringify(jsonData),
                beforeSend: function () {
                  document.getElementById("submit-create").disabled = true;
                }
            }

            // Send Fetch Request
            fetch(APIURL, settings)
                .then(response => response.json())
                .then(data => {
                    if (data._id !== undefined) {
                        sessionStorage.setItem("userID", data._id)
                        window.location.href = "index.html"
                    } else {
                        errorField.innerText = "Error: Error creating a new user"
                    }
                })
        }     
    })
})