function message() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var msg = document.getElementById("message-box");
    const success = document.getElementById("success");
    const problem = document.getElementById("problem");

    if (name.value === "" || email.value === "" || msg.value === "") {
        problem.style.display = 'block';
        success.style.display = 'none'; // Hide success message if showing error
    } else {
        problem.style.display = 'none'; // Hide error message if showing success
        success.style.display = 'block';
        setTimeout(() => {
            name.value = '';
            email.value = '';
            msg.value = '';
            success.style.display = 'none'; // Hide success message after clearing inputs
        }, 2000);
    }
}
