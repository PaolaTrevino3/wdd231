const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with functions",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with classes",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic web fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];

const courseList = document.querySelector("#course-list");
const totalCredits = document.querySelector("#total-credits");

function displayCourses(filteredCourses) {
    courseList.innerHTML = "";
    
filteredCourses.forEach(course => {
        const courseCard = document.createElement("section");
        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
        <h3>${course.subject} ${course.number}</h3>
        <p>${course.title}</p>
        <p>${course.credits} credits</p>
        `;

        courseList.appendChild(courseCard);
    });
const credits = filteredCourses.reduce((total, course) => total + course.credits, 0);
    totalCredits.textContent = `Total Credits: ${credits}`;
}

document.querySelector("#wdd").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

document.querySelector("#cse").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});

displayCourses(courses);