function checkNameInput() {
    const userName = document.getElementById("userName");
    nameValidationFeedback.textContent = userName.value !== "" ? "" : "Preencha o campo nome";
    nameValidationFeedback.style.color = userName.value !== "" ? "" : "red";

    if (userName.value !== "") {
        userName.classList.remove("is-invalid"); 
        userName.classList.add("is-valid"); 
    } else {
        userName.classList.add("is-invalid"); 
    }
}

function checkEmailInput() { 
    const userEmail = document.getElementById("userEmail");
    const isEmailValid = validateEmail(userEmail.value);

    if (userEmail.value !== "") {
        if (!isEmailValid) {
            emailValidationFeedback.textContent = "Email inválido";
            emailValidationFeedback.style.color = "red";
            userEmail.classList.add("is-invalid"); 
            return;
                        
        } else {
            emailValidationFeedback.textContent = "";
            emailValidationFeedback.style.color = "";
            userEmail.classList.remove("is-invalid"); 
            userEmail.classList.add("is-valid"); 
        }   

    } else {
        emailValidationFeedback.textContent = "Preencha o campo email";
        emailValidationFeedback.style.color = "red"; 
        userEmail.classList.add("is-invalid"); 
    }
}

const validateEmail = (email) => {
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    return regex.test(email);
};

function checkPasswordInput() {
    const userPassword = document.getElementById("userPassword");

    if (userPassword.value !== "") {
        if (userPassword.value.length > 0 && userPassword.value.length <= 5) {
            passwordValidationFeedback.textContent = "A senha tem que ter no mínimo 6 caracteres";
            passwordValidationFeedback.style.color = "red";
            userPassword.classList.add("is-invalid"); 
        } else {
            passwordValidationFeedback.textContent = "";
            passwordValidationFeedback.style.color = "";
            userPassword.classList.remove("is-invalid"); 
            userPassword.classList.add("is-valid");
        }

    } else {
        passwordValidationFeedback.textContent = "Preencha o campo senha";
        passwordValidationFeedback.style.color = "red"; 
        userPassword.classList.add("is-invalid"); 
    }
}

function createUser() {
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userPassword = document.getElementById("userPassword");
    const nameValidationFeedback = document.getElementById("nameValidationFeedback");
    const emailValidationFeedback = document.getElementById("emailValidationFeedback");
    const passwordValidationFeedback = document.getElementById("passwordValidationFeedback");
  
    nameValidationFeedback.textContent = "";
    nameValidationFeedback.style.color = "";
    emailValidationFeedback.textContent = "";
    emailValidationFeedback.style.color = "";
    passwordValidationFeedback.textContent = "";
    passwordValidationFeedback.style.color = "";

    const validationMessages = {
        "name": "Preencha o campo nome",
        "email": "Preencha o campo email",
        "password": "Preencha o campo senha"
    };
  
    const missingFields = [];
  
    if (userName.value == "") {
      missingFields.push("name");
      userName.classList.add("is-invalid"); 
    }

    if (userEmail.value == "") {
      missingFields.push("email");
      userEmail.classList.add("is-invalid"); 
    }

    if (userPassword.value == "" || userPassword.value.length <= 5) {
      missingFields.push("password");
      userPassword.classList.add("is-invalid"); 
    }
  

    if (missingFields.length > 0 && missingFields.length < 3) {
       
        for (const field of missingFields) {
            const feedbackElement = document.getElementById(`${field}ValidationFeedback`);
            feedbackElement.textContent = validationMessages[field];
            feedbackElement.style.color = "red";
        }
        toast("Formulário inválido!", "danger");
        return;

    } else if (missingFields.length == 3) {
        for (const field of missingFields) {
            const feedbackElement = document.getElementById(`${field}ValidationFeedback`);
            feedbackElement.textContent = validationMessages[field];
            feedbackElement.style.color = "red";
        }
        toast("Preencha todos os campos!", "danger");
        return;

    } else {
        const userData = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value
        }
    
        sendUserData(userData); 
    }   
}

function sendUserData(userData) {
    fetch("http://127.0.0.1:8000/api/users/create-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok && response.status !== 422) {
            throw new Error("Erro ao cadastrar usuário, por favor tente novamente!");
        } else if (!response.ok && response.status == 422) {
            throw new Error("Email já está cadastrado, por favor digite outro email!");
        }
        return response.json();
    })
    .then(data => {
        toast("Usuário criado com sucesso!", "success");
        window.location.href = "http://127.0.0.1:5500/components/usuarios-cadastrados/usuarios-cadastrados.html";
    })
    .catch(error => {
        if (error.message == "Failed to fetch") {
            toast("Erro ao cadastrar usuário, por favor tente novamente!", "danger");
        } else {
            const errorMessage = errorMessageFormatted(error);
            toast(errorMessage, "danger");
            console.error(error);
        }    
    });
}