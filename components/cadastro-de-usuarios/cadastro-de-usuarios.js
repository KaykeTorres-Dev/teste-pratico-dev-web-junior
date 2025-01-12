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

const validateEmail = (email) => {
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    return regex.test(email);
};

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

function checkPasswordInput() {
    const userPassword = document.getElementById("userPassword");

    if (userPassword.value !== "") {
        if (userPassword.value.length > 0 && userPassword.value.length < 5) {
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
        "all": "Preencha todos os campos",
        "name": "Preencha o campo nome",
        "email": "Preencha o campo email",
        "password": "Preencha o campo senha"
    };
  
    const missingFields = [];
  
    if (userName.value === "") {
      missingFields.push("name");
      userName.classList.add("is-invalid"); 
    }

    if (userEmail.value === "") {
      missingFields.push("email");
      userEmail.classList.add("is-invalid"); 
    }

    if (userPassword.value === "") {
      missingFields.push("password");
      userPassword.classList.add("is-invalid"); 
    }
  
    
    if (missingFields.length > 0) {
        for (const field of missingFields) {
        const feedbackElement = document.getElementById(`${field}ValidationFeedback`);
        feedbackElement.textContent = validationMessages[field];
        feedbackElement.style.color = "red";
        }
        return;
    }

    const userInfoObject = {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value
    }
               
    // TODO: Fazer o crud para realizar o envio dos dados do usuário para o server.
    
    console.log("Pronto para cadastrar", userInfoObject);
    // window.location.href = "http://127.0.0.1:5500/listagem-de-usuarios/listagem-de-usuarios.html";
}