function checkNameInput() {
    const userName = document.getElementById("userName").value;
    nameValidationFeedback.textContent = userName !== "" ? "" : "Preencha o campo nome";
    nameValidationFeedback.style.color = userName !== "" ? "" : "red";
}

const validateEmail = (email) => {
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    return regex.test(email);
};

function checkEmailInput() { 
    const userEmail = document.getElementById("userEmail").value;
    const isEmailValid = validateEmail(userEmail);

    if (userEmail !== "") {
        if (!isEmailValid) {
            emailValidationFeedback.textContent = "Email inválido";
            emailValidationFeedback.style.color = "red";
            return;
                        
        } else {
            emailValidationFeedback.textContent = "";
            emailValidationFeedback.style.color = "";
        }   

    } else {
        emailValidationFeedback.textContent = "Preencha o campo email";
        emailValidationFeedback.style.color = "red"; 
    }
}

function checkPasswordInput() {
    const userPassword = document.getElementById("userPassword").value;

    if (userPassword !== "") {
        if (userPassword.length > 0 && userPassword.length < 5) {
            passwordValidationFeedback.textContent = "A senha tem que ter no mínimo 6 caracteres";
            passwordValidationFeedback.style.color = "red";
        } else {
            passwordValidationFeedback.textContent = "";
            passwordValidationFeedback.style.color = "";
        }

    } else {
        passwordValidationFeedback.textContent = "Preencha o campo senha";
        passwordValidationFeedback.style.color = "red";
    }
}

function createUser() {
    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;
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
        "password": "Preencha o campo senha",
    };
  
    const missingFields = [];
  
    if (userName === "") {
      missingFields.push("name");
    }
    if (userEmail === "") {
      missingFields.push("email");
    }
    if (userPassword === "") {
      missingFields.push("password");
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
        name: userName,
        email: userEmail,
        password: userPassword
    }
               
    // TODO: Fazer o crud para realizar o envio dos dados do usuário para o server.
    
    console.log("Pronto para cadastrar", userInfoObject);
    // window.location.href = "http://127.0.0.1:5500/listagem-de-usuarios/listagem-de-usuarios.html";
}