document.addEventListener("DOMContentLoaded", function() {
    const APIKEY = "65b3d7e8d6d732424adaa3d0"
    const APIURL = "https://fedassignment-6326.restdb.io/rest/shopusers"
    const loaderAnim = document.getElementById("loader")

    // If user is already signed in, just redirect to index.html
    if (sessionStorage.getItem("userID")) {
        window.location.href = "index.html"
    }


    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault()

        const errorField = document.getElementById("err-msg")

        // Get Data
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        const settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
            },
            beforeSend: function () {
                document.getElementById("submit-login").disabled = true;
                loaderAnim.classList.remove("hidden")
            }
        }

        fetch(`${APIURL}?q={"username":"${username}"}`, settings)
            .then(response => response.json())
            .then(data => {
                loaderAnim.classList.add("hidden")

                if (data.length === 0) {
                    errorField.innerText = "Error: No Account with username found!"
                } else {
                    const userObj = data[0]
                    if (userObj.password === password) {
                        sessionStorage.setItem("userID", userObj._id)
                        window.location.href = "index.html"
                    } else {
                        errorField.innerText = "Incorrect Password!"
                    }
                }
            })
    })
})