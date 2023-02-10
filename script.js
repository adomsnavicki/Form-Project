const initialData = [
  {
    name: "Vardas 1",
    surname: "Pavardė 1",
    age: 25,
    phone: "+3704564879",
    email: "vardas1@gmail.com",
    itKnowledge: 7,
    group: "feu 3",
    interests: ["JavaScript", "PHP"],
  },
  {
    name: "Vardas 2",
    surname: "Pavardė 2",
    age: 32,
    phone: "+37045645455",
    email: "vardas3@gmail.com",
    itKnowledge: 10,
    group: "feu 1",
    interests: ["JavaScript"],
  },
  {
    name: "Vardas 3",
    surname: "Pavardė 3",
    age: 20,
    phone: "+3704564879",
    email: "vardas3@gmail.com",
    itKnowledge: 2,
    group: "feu 4",
    interests: ["PHP"],
  },
  {
    name: "Vardas 5",
    surname: "Pavardė 5",
    age: 40,
    phone: "+3704564879",
    email: "vardas5@gmail.com",
    itKnowledge: 4,
    group: "feu 3",
    interests: [],
  },
  {
    name: "Vardas 5",
    surname: "Pavardė 5",
    age: 25,
    phone: "+3704564879",
    email: "vardas5@gmail.com",
    itKnowledge: 7,
    group: "feu 3",
    interests: ["JavaScript", "PHP"],
  },
];

const data = [];

const form = document.querySelector("form");

let editStudent = null;

const itKnowledgeInput = form.querySelector("#student-it-knowledge");
const itKnowledgeOutput = form.querySelector("#it-knowledge-output");

itKnowledgeInput.addEventListener("input", (event) => {
  itKnowledgeOutput.textContent = event.target.value;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formTrueFalse = checkAllInputErrors(event.target);
  if (!formTrueFalse) {
    return;
  }

  const firstName = event.target["student-name"].value;
  const lastName = event.target["student-surname"].value;
  const age = event.target["student-age"].value;
  const phone = event.target["student-phone"].value;
  const email = event.target["student-email"].value;
  const knowledge = event.target["student-it-knowledge"].value;
  const studentGroup = event.target.group.value;
  const interest = event.target.querySelectorAll('[name="interest"]:checked');

  let interests = event.target.querySelectorAll('[name="interest"]:checked');

  const studentInterests = [...interests].map((interest) => {
    return interest.value;
  });

  let studentDataObj = {
    name: event.target["student-name"].value,
    surname: event.target["student-surname"].value,
    age: event.target["student-age"].value,
    phone: event.target["student-phone"].value,
    email: event.target["student-email"].value,
    itKnowledge: event.target["student-it-knowledge"].value,
    group: event.target.group.value,
    interests: studentInterests,
  };

  renderSinglePerson(studentDataObj, event.target);

  event.target.reset();
  localStorage.clear();
  localStorage.setItem("name", "");
  localStorage.setItem("surname", "");
  localStorage.setItem("age", "");
  localStorage.setItem("phone", "");
  localStorage.setItem("email", "");
  localStorage.setItem("it-knowledge", "");
  localStorage.setItem("it-group", "");
  localStorage.setItem("interest", JSON.stringify([]));
  data.push(studentDataObj);
  JSON.stringify(data);
  data.forEach((item) => {
    let personInformation = JSON.stringify(item);
    localStorage.setItem("data", personInformation);
  });
});

function messageAlert(element, message, color = "white") {
  const previousMessageElement = document.querySelector(".popup-info-message");
  if (previousMessageElement) {
    previousMessageElement.remove();
  }
  const messageElement = document.createElement("span");
  const textArea = document.getElementById("comment-area");
  textArea.classList.remove("comment-area-off");
  textArea.classList.add("comment-area");
  const misterCorrect = document.getElementById("mister-image");
  misterCorrect.classList.add("img-filter");

  messageElement.textContent = message;
  messageElement.style.color = color;
  messageElement.classList.add("popup-info-message");
  messageElement.classList.add("alert-message-textarea");

  element.after(messageElement);

  setTimeout(() => {
    messageElement.remove();
    textArea.classList.remove("comment-area");
    textArea.classList.add("comment-area-off");
    misterCorrect.classList.remove("img-filter");
  }, 5000);
}

function inputErrorMessage(element, text) {
  const inputErrorMessage = document.createElement("span");
  inputErrorMessage.classList.add("input-error-message");
  inputErrorMessage.textContent = text;
  element.after(inputErrorMessage);

  element.classList.add("border-red");

  formIsValid = false;
}

function renderInitialData(students, personForm) {
  students.forEach((personData) => {
    renderSinglePerson(personData, personForm);
  });
}

function renderSinglePerson(student, form) {
  const firstName = student.name;
  const lastName = student.surname;
  const age = student.age;
  const phone = student.phone;
  const email = student.email;
  const knowledge = student.itKnowledge;
  const studentGroup = student.group;
  const interest = student.interests;

  studentList = document.querySelector("#student-list");
  studentList.classList.add("student-list-wrapper");
  let studentItem = document.createElement("div");
  studentItem.classList.add("student-item");
  let infoAboutStudentH1 = document.createElement("h1");
  let infoAboutStudentLiName = document.createElement("li");
  let infoAboutStudentLiLastName = document.createElement("li");
  let infoAboutStudentLiAge = document.createElement("li");
  let infoAboutStudentLiPhone = document.createElement("li");
  let infoAboutStudentLiEmail = document.createElement("li");
  let infoAboutStudentLiKnowledge = document.createElement("li");
  let infoAboutStudentLiGroup = document.createElement("li");
  let infoAboutStudentH2 = document.createElement("h2");
  let buttonShowPersonData = document.createElement("button");
  let buttonDelPerson = document.createElement("button");
  let buttonChangeData = document.createElement("button");

  infoAboutStudentH1.textContent = "Info About Student:";
  infoAboutStudentH2.textContent = "Interest: Empty...";
  buttonShowPersonData.textContent = "Show person data";
  buttonDelPerson.textContent = "Delete person";
  buttonChangeData.textContent = `Change person data`;

  studentItem.append(
    infoAboutStudentH1,
    infoAboutStudentLiName,
    infoAboutStudentLiLastName,
    infoAboutStudentLiAge,
    infoAboutStudentLiPhone,
    infoAboutStudentLiEmail,
    infoAboutStudentLiKnowledge,
    infoAboutStudentLiGroup,
    infoAboutStudentH2,
    buttonShowPersonData,
    buttonDelPerson,
    buttonChangeData
  );

  studentList.prepend(studentItem);

  buttonShowPersonData.classList.add("buttons-cards");
  buttonDelPerson.classList.add("buttons-cards");
  buttonChangeData.classList.add("buttons-cards");

  infoAboutStudentLiName.textContent = `Name: ${firstName}`;
  infoAboutStudentLiLastName.textContent = `Lastname: ${lastName}`;
  infoAboutStudentLiAge.textContent = `Age: ${age}`;
  infoAboutStudentLiPhone.textContent = `Phone: ${phone}`;
  infoAboutStudentLiEmail.textContent = `Email:`;
  infoAboutStudentLiKnowledge.textContent = `Knowledge: ${knowledge}`;
  infoAboutStudentLiGroup.textContent = `Group: ${studentGroup.toUpperCase()}`;

  const firstNameText = (infoAboutStudentLiName.textContent = `Name: `);
  const emailText = (infoAboutStudentLiEmail.textContent = `Email:`);
  let hideText = "********";
  hideEmailOutput = "";
  hideFirstName = firstNameText + hideText;
  if (firstName.length > 1) {
    infoAboutStudentLiName.textContent = hideFirstName;
  }
  if (email.length > 1) {
    hideEmailOutput += infoAboutStudentLiEmail.textContent += hideText;
  }

  let output = emailText + email;
  let nameOutput = firstNameText + firstName;
  function changeEmail() {
    if (email.length > 1 && firstName.length > 1)
      if (
        infoAboutStudentLiEmail.textContent === hideEmailOutput &&
        infoAboutStudentLiName.textContent === hideFirstName
      ) {
        infoAboutStudentLiEmail.textContent = output;
        infoAboutStudentLiName.textContent = nameOutput;
        buttonShowPersonData.textContent = "Hide person data";
      } else if (
        infoAboutStudentLiEmail.textContent === output &&
        infoAboutStudentLiName.textContent === nameOutput
      ) {
        infoAboutStudentLiEmail.textContent = emailText + hideText;
        infoAboutStudentLiName.textContent = firstNameText + hideText;
        buttonShowPersonData.textContent = "Show person data";
      } else {
        infoAboutStudentLiEmail.textContent = output;
        infoAboutStudentLiName.textContent = nameOutput;
      }
  }

  buttonShowPersonData.addEventListener("click", () => {
    changeEmail();
  });

  buttonDelPerson.addEventListener("click", () => {
    studentItem.remove();
    messageAlert(form, removePersonText, "white");
  });
  let removePersonText = `You have successfully removed a person (${firstName} ${lastName})`;

  interest.forEach((element) => {
    if (interest.length > 0) {
      let interestLi = document.createElement("li");
      interestLi.textContent = element;
      infoAboutStudentH2.textContent = "Interest: ";
      studentItem.append(
        interestLi,
        buttonShowPersonData,
        buttonDelPerson,
        buttonChangeData
      );
    }
  });
  let createPersonText = `Congratulations! You are created student. (${firstName} ${lastName})`;
  messageAlert(form, createPersonText, "white");

  buttonChangeData.addEventListener("click", () => {
    let submitButton = document.querySelector(".create-button");

    if (submitButton.value === "Create Student") {
      submitButton.value = "Save Changes";
      submitButton.classList.add("save-changes");
      form.name.value = firstName;
      form.surname.value = lastName;
      form.age.value = age;
      form.phone.value = phone;
      form.email.value = email;
      form.group.value = studentGroup;
      form["it-knowledge"].value = knowledge;
      interest.forEach((interest) => {
        form.querySelector(
          `[name="interest"][value="${interest}"]`
        ).checked = true;
      });
    } else if (submitButton.value === "Save Changes") {
      submitButton.value = "Create Student";
      submitButton.classList.remove("save-changes");
      form.reset();
    }

    editStudent = studentItem;
  });

  let submitButton = document.querySelector(".create-button");
  if (submitButton.value === "Save Changes") {
    messageAlert(form, "You have saved your changes!", "white");
    submitButton.value = "Create Student";
    submitButton.style.color = "";
  }
  if (editStudent) {
    submitButton.value = "Create Student";
    submitButton.classList.remove("save-changes");
    editStudent.replaceWith(studentItem);
    editStudent = null;
  } else {
    studentList.prepend(studentItem);
  }
}

function checkAllInputErrors(form) {
  let required = document.querySelectorAll(".required");
  const previousInputErrorMessage = form.querySelectorAll(
    ".input-error-message"
  );
  let formWorth = true;
  previousInputErrorMessage.forEach((errorMessage) => {
    errorMessage.remove();
  });
  required.forEach((element, index) => {
    element.classList.remove("alert-border");
    element.classList.remove("input-error-message");
    element.classList.remove("border-red");

    if (!element.value) {
      messageAlert(form, "There is an empty cell!", "white");
      inputErrorMessage(element, "Field required!");
      formWorth = false;
      return;
    }
    if (index === 0) {
      if (required[index].value.length > 3) {
        return;
      }

      inputErrorMessage(element, "Name must have at least 3 characters!");
      formWorth = false;
      return;
    }
    if (index === 1) {
      if (required[index].value.length > 3) {
        return;
      }
      inputErrorMessage(element, "Surname must have at least 3 characters!");
      formWorth = false;
      return;
    }

    if (index === 2) {
      const value = required[index].valueAsNumber;

      if (value > 0 && value < 120) {
        return;
      }

      if (value < 0) {
        inputErrorMessage(element, "Age must be a positive number!");
        formWorth = false;
        return;
      }
      if (value === 0) {
        inputErrorMessage(element, "Age cannot be 0!");
        formWorth = false;
        return;
      }

      if (value > 120) {
        inputErrorMessage(element, "The age entered is too high!");
        formWorth = false;
        return;
      }
    }

    if (index === 3) {
      const value = required[index].value.length;

      if (value >= 9 && value <= 12) {
        return;
      }

      inputErrorMessage(element, "The phone number is incorrect!");
      formWorth = false;
      return;
    }

    if (index === 4) {
      const valueLength = required[index].value.length;
      const valueText = required[index].value;

      if (valueLength < 0) {
        return;
      }

      if (valueLength < 8) {
        inputErrorMessage(
          element,
          "Email must have at least 8 characters and these characters(@|.)!"
        );
        formWorth = false;
        return;
      }

      if (!valueText.match(/[.]/)) {
        inputErrorMessage(element, "Email must have this character(.)!");
        formWorth = false;
        return;
      }
      if (!valueText.match(/[@]/)) {
        inputErrorMessage(element, "Email must have this character(@)!");
        formWorth = false;
        return;
      }
    }
  });
  console.log(formWorth);
  return formWorth;
}

form.addEventListener("input", (event) => {
  if (event.target.name === "interest") {
    let checkedInterests = form.querySelectorAll('[name="interest"]:checked');

    let checkedInterestValues = [...checkedInterests].map((interest) => {
      return interest.value;
    });

    localStorage.setItem("interest", JSON.stringify(checkedInterestValues));
  } else {
    localStorage.setItem(event.target.name, event.target.value);
  }
});
form.name.value = localStorage.getItem("name");
form.surname.value = localStorage.getItem("surname");
form.age.value = localStorage.getItem("age");
form.phone.value = localStorage.getItem("phone");
form.email.value = localStorage.getItem("email");
form["student-it-knowledge"].value = localStorage.getItem("it-knowledge");
form.group.value = localStorage.getItem("group");

if (localStorage.getItem("name")) {
  form.name.value = localStorage.getItem("name");
}

if (localStorage.getItem("surname")) {
  form.surname.value = localStorage.getItem("surname");
}

if (localStorage.getItem("age")) {
  form.age.value = localStorage.getItem("age");
}

if (localStorage.getItem("phone")) {
  form.phone.value = localStorage.getItem("phone");
}

if (localStorage.getItem("email")) {
  form.email.value = localStorage.getItem("email");
}

if (localStorage.getItem("it-knowledge")) {
  form["it-knowledge"].value = localStorage.getItem("it-knowledge");
}

if (localStorage.getItem("group")) {
  form.group.value = localStorage.getItem("group");
}
let localStorageInterests = JSON.parse(localStorage.getItem("interest"));

if (localStorageInterests) {
  localStorageInterests.map((localStorageInterest) => {
    form.querySelector(
      '[name="interest"][value="' + localStorageInterest + '"]'
    ).checked = true;
  });
}
