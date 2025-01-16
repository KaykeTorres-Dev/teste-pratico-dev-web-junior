let toastCount = 0;  
let toastQueue = [];  

function toast(message, type = "info") {
    const toastContainer = document.createElement("div");
    toastContainer.classList.add("toast-container", "position-fixed", "p-3", "top-0", "end-0");

    const toast = document.createElement("div");
    toast.classList.add("toast", `bg-${type}`);

    const toastBody = document.createElement("div");
    toastBody.classList.add("toast-body", "text-light");
    toastBody.textContent = message;

    toast.appendChild(toastBody);
    toastContainer.appendChild(toast);

    toast.style.marginTop = `${toastCount * 80}px`; 
    toastCount++;

    document.body.appendChild(toastContainer);

    toast.classList.add("show");

    toastQueue.push(toast);

    setTimeout(() => {
        const currentToast = toastQueue.pop();
        currentToast.classList.remove("show");
        toastCount--;
    }, 5000);
}
