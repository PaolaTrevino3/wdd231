const submission = sessionStorage.getItem("chamberJoinSubmission");

if (submission) {
    const values = JSON.parse(submission);
    const fullName = `${values["first-name"] || ""} ${values["last-name"] || ""}`.trim();
    const businessName = values["business-name"] || "your business";

    const nameTarget = document.querySelector("#confirmation-name");
    const businessTarget = document.querySelector("#confirmation-business");
    const membershipTarget = document.querySelector("#confirmation-membership");
    const emailTarget = document.querySelector("#confirmation-email");
    const phoneTarget = document.querySelector("#confirmation-phone");

    if (nameTarget) {
        nameTarget.textContent = fullName || "you";
    }

    if (businessTarget) {
        businessTarget.textContent = businessName;
    }

    if (membershipTarget) {
        membershipTarget.textContent = values.membership || "Pending";
    }

    if (emailTarget) {
        emailTarget.textContent = values.email || "Pending";
    }

    if (phoneTarget) {
        phoneTarget.textContent = values.phone || "Pending";
    }
}
