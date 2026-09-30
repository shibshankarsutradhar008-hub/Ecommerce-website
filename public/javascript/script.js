setTimeout(() => {
    const message = document.querySelector(".flash-message");

    if (message) {
        message.remove();
    }
}, 1000);