const joinForm = document.querySelector("#join-form");

if (joinForm) {
    joinForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(joinForm);
        const values = Object.fromEntries(formData.entries());

        sessionStorage.setItem("chamberJoinSubmission", JSON.stringify(values));
        window.location.href = "thankyou.html";
    });
}
