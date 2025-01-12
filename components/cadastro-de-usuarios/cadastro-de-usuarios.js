function createUser() {
    let userName = document.getElementById("userName").value;
    let userEmail = document.getElementById("userEmail").value;
    let userPassword = document.getElementById("userPassword").value;
    let isFormUserNull = false;
    let isUserNameInputNull = false;
    let isUserEmailInputNull = false;
    let isUserPasswordInputNull = false;

   
    if (userName == "" && userEmail == "" && userPassword == "") {
        console.log("Preencha todos os campos !!!");  
        isFormUserNull = true;
       
         
    } else if (userName !== "" && userEmail == "" && userPassword == "") {
        console.log("Preencha os campos de email e senha!!!"); 
        isUserEmailInputNull = true;  
        isUserPasswordInputNull = true;  

    } else if (userName == "" && userEmail !== "" && userPassword == "") {
        console.log("Preencha os campos de nome e senha!!!"); 
        isUserNameInputNull = true;  
        isUserPasswordInputNull = true;  

    } else if (userName == "" && userEmail == "" && userPassword !== "") {
        console.log("Preencha os campos de nome e email!!!"); 
        isUserNameInputNull = true;  
        isUserEmailInputNull = true;  
       
    } else if (userName == "" && userEmail !== "" && userPassword !== "") {
        console.log("Preencha o campo nome!!!"); 
        isUserNameInputNull = true;


    } else if (userName !== "" && userEmail == "" && userPassword !== "") {
        console.log("Preencha o campo email!!!"); 
        isUserEmailInputNull = true;  

       
    } else if (userName !== "" && userEmail != "" && userPassword == "") {
        console.log("Preencha o campo senha!!!"); 
        isUserPasswordInputNull = true; 

    }  else {
        console.log("Pronto para cadastrar");
        window.location.href = "http://127.0.0.1:5500/listagem-de-usuarios/listagem-de-usuarios.html";
    }  

}