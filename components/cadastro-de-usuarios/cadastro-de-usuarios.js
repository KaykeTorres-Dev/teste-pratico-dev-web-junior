function createUser() {
    // debugger
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
    }  


    function checkPassword() {
        const confirmPassword = this.form.get('confirmPassword')?.value;
    
        if (password !== null && password !== '') {
          if (password.length > 0 && password.length < 6) {
            this.isPasswordInvalid = true;
    
          } else if (password.length >= 6) {
            this.isPasswordInvalid = false;
    
          } if (confirmPassword !== null && confirmPassword !== '') {
            if (password !== confirmPassword) {
              this.isPasswordMatch = false;
            } else {
              this.isPasswordMatch = true;
            }
          }
    
        } else if (confirmPassword !== null && confirmPassword !== '') {
          this.isPasswordInvalid = false;
          this.isFormInvalid = false;
        } else {
          this.isPasswordInvalid = false;
          this.isConfirmPasswordEmpty = false;
        }
      }
    
    
       
    
    


}