function errorMessageFormatted(message) {
    const errorMessage = message.toString();
    const toastMessage = errorMessage.slice(7);
    return toastMessage;
}