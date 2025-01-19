let originalUserData = {};

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdParam = urlParams.get("id");
    const userId = document.getElementById("userId");
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userPassword = document.getElementById("userPassword");
    

    fetch(`http://127.0.0.1:8000/api/get-user/${userIdParam}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => {
        if (!response.ok) {
        throw new Error("Erro ao carregar os dados do usuário, por favor tente novamente!");
        }
        return response.json();
    })
    .then(data => {
        originalUserData = {
            name:  data.users.name,
            email:  data.users.email
        }

        userId.value = data.users.id,
        userName.value = data.users.name,
        userEmail.value = data.users.email,
        userPassword.value = data.users.password
    })
    .catch(error => {
        if (error.message == "Failed to fetch") {
            toast("Erro ao carregar os dados do usuário, por favor tente novamente!", "danger");
        } else {
            const errorMessage = errorMessageFormatted(error);
            toast(errorMessage, "danger");
            console.error(error);
        }
    });
    
});

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

function updateUser() {
    const nameValidationFeedback = document.getElementById("nameValidationFeedback");
    const emailValidationFeedback = document.getElementById("emailValidationFeedback");
  
    nameValidationFeedback.textContent = "";
    nameValidationFeedback.style.color = "";
    emailValidationFeedback.textContent = "";
    emailValidationFeedback.style.color = "";

    const validationMessages = {
        "name": "Preencha o campo nome",
        "email": "Preencha o campo email"
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

    if (missingFields.length == 1) {
        for (const field of missingFields) {
            const feedbackElement = document.getElementById(`${field}ValidationFeedback`);
            feedbackElement.textContent = validationMessages[field];
            feedbackElement.style.color = "red";
            toast("Formulário inválido!", "danger");
        }
        return;

    } else if (missingFields.length == 2) {
        for (const field of missingFields) {
            const feedbackElement = document.getElementById(`${field}ValidationFeedback`);
            feedbackElement.textContent = validationMessages[field];
            feedbackElement.style.color = "red";
        }
        toast("Preencha todos os campos!", "danger");
        return;

    } else if (!hasUserUpdatedInput()){
        toast("Atualize os dados!", "danger");
        return;

    } else {
        const userData = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value
        }
        updateUserData(userData);   
    }   
}

function hasUserUpdatedInput() {
    return (userName.value !== originalUserData.name || userEmail.value !== originalUserData.email);
}

function updateUserData(userData) {
    
    fetch(`http://127.0.0.1:8000/api/update-user/${userId.value}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao atualizar os dados, por favor tente novamente!");
        }
        return response.json();
    })
    .then(data => {
        toast("Usuário atualizado com sucesso!", "success");
        window.location.href = "http://127.0.0.1:5500/components/listagem-de-usuarios/listagem-de-usuarios.html";
    })
    .catch(error => {
        const errorMessage = errorMessageFormatted(error);
        toast(errorMessage, "danger");
        console.error(error);
    });
}