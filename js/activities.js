const config = {
  backendUrl: "http://localhost:8000/", // Default backend URL
};
const port = 8000;

// Function to validate Firstname and Lastname
function validateName() {
  const fullnameInput = document.getElementById("fullname");
  const names = fullnameInput.value.trim().split(" ");
  const errorElement = document.getElementById("fullnameError");
  if (names.length !== 2) {
    errorElement.textContent = "Please enter both your Firstname and Lastname.";
    fullnameInput.classList.add("wrong");
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
    fullnameInput.classList.add("wrong");
  }
  return true;
}

// Function to validate Student ID
function validateStudentID() {
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^6609\d{6}$/;
  const errorElement = document.getElementById("studentIDError");
  if (!studentIDPattern.test(studentIDInput.value)) {
    errorElement.textContent = "Please enter a 10-digit Student ID.";
    studentIDInput.classList.add("wrong");
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
    studentIDInput.classList.add("wrong");
  }
  return true;
}

// Function to validate University Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailPattern = /^.+@dome\.tu\.ac\.th$/;
  const errorElement = document.getElementById("emailError");
  if (!emailPattern.test(emailInput.value)) {
    errorElement.textContent = "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
    emailInput.classList.add("wrong");
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
    emailInput.classList.remove("wrong");
  }
  return true;
}

function validateTitle() {
  const titleInput = document.getElementById("workTitle");
  const titlePattern = /^[a-zA-Zก-๙ ]{4,}$/;
  const errorElement = document.getElementById("workError");
  if (!titlePattern.test(titleInput.value)) {
    errorElement.textContent = "Title must be at least 4 characters and cannot use number.";
    titleInput.classList.add("wrong");
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
    titleInput.classList.remove("wrong");
  }
  return true;
}

function validateActivity(){
  const Input = document.getElementById("activityType");
  const errorElement = document.getElementById("activityError");
  if (Input.value == "") {
      errorElement.innerHTML = "Required.";
      Input.classList.add("wrong");
      return false;
  } else {
      errorElement.innerHTML = "";
      Input.classList.remove("wrong");
  }
  return true;
}
function validateAcademic(){
  const Input = document.getElementById("academicYear");
  const errorElement = document.getElementById("academicError");
  if (Input.value == "") {
      errorElement.innerHTML = "Required.";
      Input.classList.add("wrong");
      return false;
  } else {
      errorElement.innerHTML = "";
      Input.classList.remove("wrong");
  }
  return true;
}
function validateSemester(){
  const Input = document.getElementById("semester");
  const errorElement = document.getElementById("semesterError");
  if (Input.value == "") {
      errorElement.innerHTML = "Required.";
      Input.classList.add("wrong");
      return false;
  } else {
      errorElement.innerHTML = "";
      Input.classList.remove("wrong");
  }
  return true;
}

function validateDate(){
  const Input = document.getElementById("endDate");
  const Inputs = document.getElementById("startDate");
  const errorElement = document.getElementById("endDateError");
  if (Input.value == "") {
      errorElement.innerHTML = "Required.";
      Input.classList.remove("wrong");
      Inputs.classList.remove("wrong");
      return false;
  } else {
      errorElement.innerHTML = "";
      Input.classList.add("wrong");
      Inputs.classList.add("wrong");
  }
  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (endDate <= startDate){
    errorElement.textContent = "End Date/Time must be after Start DateTime.";
    Input.classList.add("wrong");
    Inputs.classList.add("wrong");
    return false;
  }else {
    errorElement.innerHTML = "";
    Input.classList.remove("wrong");
    Inputs.classList.remove("wrong");
  }
  return true;
}

function validateLocation() {
  const locationInput = document.getElementById("location");
  const errorElement = document.getElementById("locationError");
  if (locationInput.value == "") {
      errorElement.textContent = "Required.";
      locationInput.classList.add("wrong");
      return false;
  } else {
      errorElement.textContent = ""; // Clear the error message when valid
      locationInput.classList.remove("wrong");
  }
  return true;
}

// Function to validate form inputs on user input
function validateFormOnInput() {
  validateName();
  validateStudentID();
  validateEmail();
  validateTitle();
  validateActivity();
  validateAcademic();
  validateSemester();
  validateDate();
  validateLocation();
}

// Function to fetch activity types from the backend
async function fetchActivityTypes() {
  try {
    const response = await fetch(`http://${window.location.hostname}:${port}/getActivityType`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch activity types.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching activity types:", error);
    return [];
  }
}

// Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
  const activityTypeSelect = document.getElementById("activityType");

  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option);
  }
}

// Event listener when the page content has finished loading
document.addEventListener("DOMContentLoaded", async () => {
  const activityTypes = await fetchActivityTypes();
  populateActivityTypes(activityTypes);
});

// Function to submit the form
async function submitForm(event) {
  event.preventDefault();

  // Validate form inputs before submission
  if (!validateName() || !validateStudentID() || !validateEmail() || !validateTitle() || !validateActivity() ||
  !validateAcademic() || !validateSemester() || !validateDate() || !validateLocation()) {
    return;
  }

  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (endDate <= startDate) {
    alert("End datetime should be after the start datetime.");
    return;
  }

  // Create the data object to send to the backend
  const formData = new FormData(event.target);
  const data = {
    first_name: formData.get("fullname").split(" ")[0],
    last_name: formData.get("fullname").split(" ")[1],
    student_id: parseInt(formData.get("studentID")),
    email: formData.get("email"),
    title: formData.get("workTitle"),
    type_of_work_id: parseInt(formData.get("activityType")),
    academic_year: parseInt(formData.get("academicYear")) - 543,
    semester: parseInt(formData.get("semester")),
    start_date: formData.get("startDate"),
    end_date: formData.get("endDate"),
    location: formData.get("location"),
    description: formData.get("description")
  };

  console.log(data);

  try {
    // Send data to the backend using POST request
    const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Form data submitted successfully!");

      // Format JSON data for display
      const formattedData = Object.entries(responseData.data)
        .map(([key, value]) => `"${key}": "${value}"`)
        .join("\n");

      // Display success message with formatted data
      alert(responseData.message + "\n" + formattedData);

      document.getElementById("myForm").reset();
    } else {
      console.error("Failed to submit form data.");

      // Display error message
      alert("Failed to submit form data. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred while submitting form data:", error);
  }
}

function showInput() {
  var name = document.getElementById("fullname").value;
  var studentID = document.getElementById("studentID").value;
  var universityEmail = document.getElementById("email").value;
  var workTitle = document.getElementById("workTitle").value;
  var workType = document.getElementById("activityType").value;
  var academicYear = document.getElementById("academicYear").value;
  var semester = document.getElementById("semester").value;
  var startDate = document.getElementById("startDate").value;
  var endDate = document.getElementById("endDate").value;
  var location = document.getElementById("location").value;
  var description = document.getElementById("description").value;

  if (name &&studentID &&universityEmail &&workTitle &&workType 
    &&academicYear &&semester &&startDate &&endDate &&location ||description) {
      var result =
      "<p>Firstname and Lastname: " +name +"</p>" +
      "<p>Student ID: " +studentID +"</p>" +
      "<p>University Email: " +universityEmail +"</p>" +
      "<p>Work/Activity Title: " +workTitle +"</p>" +
      "<p>Type of Work/Activity: " +workType +"</p>" +
      "<p>Academic Year: " +academicYear +"</p>" +
      "<p>Semester: " +semester +"</p>" +
      "<p>Start Date/Time: " +startDate +"</p>" +
      "<p>End Date/Time: " +endDate +"</p>" +
      "<p>Location: " +location +"</p>" +
      "<p>Description: " +description +"</p>";

      display_message.innerHTML = result;
  } else {
    alert("Please fill in all required information.");
  }
}

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document.getElementById("studentID").addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("workTitle").addEventListener("input", validateTitle);
document.getElementById("activity").addEventListener("input", validateActivity);
document.getElementById("academic").addEventListener("input", validateAcademic);
document.getElementById("semester").addEventListener("input", validateSemester);
document.getElementById("endDate").addEventListener("input", validateDate);
document.getElementById("location").addEventListener("input", validateLocation);