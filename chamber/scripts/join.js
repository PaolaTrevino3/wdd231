const timestampInput = document.querySelector("#timestamp");

const modalButtons = document.querySelectorAll(".modal-button");

const closeButtons = document.querySelectorAll(".close-modal");

const dialogs = document.querySelectorAll("dialog");

if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}

modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const dialog = button.closest("dialog");

        if (dialog) {
            dialog.close();
        }
    });
});

dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});
