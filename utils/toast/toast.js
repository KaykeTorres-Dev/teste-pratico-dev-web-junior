function toast(message, type = "info") {

    const toastContainer = document.createElement("div");
    toastContainer.classList.add("toast-container", "position-fixed","p-3", "top-0", "end-0");
  
    const toast = document.createElement("div");
    toast.classList.add("toast", `bg-${type}`); 
   
    const toastBody = document.createElement("div");
    toastBody.classList.add("toast-body", "text-light");
    toastBody.textContent = message;
  
    toast.appendChild(toastBody);
    toastContainer.appendChild(toast);
    document.body.appendChild(toastContainer);

    toast.classList.add("show"); 

    setTimeout(() => {
        toast.classList.remove("show"); 
    }, 3000);
}
  