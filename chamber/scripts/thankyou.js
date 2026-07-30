const params = new URLSearchParams(window.location.search);

function displayValue(selector, parameterName) {
    const element = document.querySelector(selector);
    const value = params.get(parameterName);

    if (element) {
        element.textContent = value || "Not provided";
    }
}

displayValue("#confirmation-first", "first");
displayValue("#confirmation-last", "last");
displayValue("#confirmation-email", "email");
displayValue("#confirmation-phone", "phone");
displayValue("#confirmation-organization", "organization");

const timestampElement =
    document.querySelector("#confirmation-timestamp");

const timestampValue =
    params.get("timestamp");

if (timestampElement) {
    if (timestampValue) {
        const applicationDate =
            new Date(timestampValue);

        if (!Number.isNaN(applicationDate.getTime())) {
            timestampElement.textContent =
                applicationDate.toLocaleString("en-US", {
                    dateStyle: "long",
                    timeStyle: "short"
                });
        } else {
            timestampElement.textContent =
                timestampValue;
        }
    } else {
        timestampElement.textContent =
            "Not provided";
    }
}
