const popupContainer = document.querySelector(".popup_container");
const close = document.querySelector(".close");

const form = document.querySelector("#form");
const fName = document.querySelector("#fname");
const lName = document.querySelector("#lname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const conformPassword = document.querySelector("#conform_password");
const country = document.querySelector("#country");
const code = document.querySelector("#code");
const phone = document.querySelector("#phone");
const yes = document.querySelector("#yes");
const no = document.querySelector("#no");
const message = document.querySelector("#message");
const textCount = document.querySelector(".text_count");
const dob = document.querySelector("#dob");
const submit = document.querySelector(".submit");

//  !Select the Number (Phone) type Input Parent Element
const phoneWrap = phone.parentElement;

//  !Select the Radio type Input Parent Element
const inputOptionYes = no.parentElement;
const inputOption = inputOptionYes.parentElement;

//  !Show password and Hide Password
const eyeOpen = document.querySelector(".eye_open");
const eyeClose = document.querySelector(".eye_close");
const conEyeOpen = document.querySelector(".con_eye_open");
const conEyeClose = document.querySelector(".con_eye_close");

eyeOpen.addEventListener("click", () => {
	if (password.type === "password") {
		password.type = "text";
		eyeOpen.style.visibility = "hidden";
		eyeClose.style.visibility = "visible";
	}
});

eyeClose.addEventListener("click", () => {
	if (password.type === "text") {
		password.type = "password";
		eyeClose.style.visibility = "hidden";
		eyeOpen.style.visibility = "visible";
	}
});

conEyeOpen.addEventListener("click", () => {
	if (conformPassword.type === "password") {
		conformPassword.type = "text";
		conEyeOpen.style.visibility = "hidden";
		conEyeClose.style.visibility = "visible";
	}
});

conEyeClose.addEventListener("click", () => {
	if (conformPassword.type === "text") {
		conformPassword.type = "password";
		conEyeClose.style.visibility = "hidden";
		conEyeOpen.style.visibility = "visible";
	}
});

form.addEventListener("submit", function (e) {
	e.preventDefault();
	validation();
});

// !setErrorMassage functions Declaration
const setErrorMsg = function (input, message) {
	const formContainer = input.parentElement;
	formContainer.className = "form_container error";
	const errMessage = formContainer.querySelector(".err_message");
	errMessage.textContent = message;
};

// !setSuccessMassage functions Declaration
const setSuccessMsg = function (input) {
	const formContainer = input.parentElement;
	formContainer.className = "form_container success";
};

//  !Count the Massage Text
let textCounterValue = 100;
textCount.textContent = textCounterValue;
message.addEventListener("keyup", function () {
	let len = message.value.length;
	console.log(len);
	textCount.textContent = textCounterValue - len;
});

//  !Add disable Attribute in input Tag
const addDisableAttribute = function () {
	fName.disabled = true;
	lName.disabled = true;
	email.disabled = true;
	password.disabled = true;
	conformPassword.disabled = true;
	country.disabled = true;
	// code.disabled = true;
	phone.disabled = true;
	yes.disabled = true;
	no.disabled = true;
	message.disabled = true;
	textCount.disabled = true;
	// dob.disabled = true;
	submit.disabled = true;
};
const removeDisableAttribute = function () {
	fName.disabled = false;
	lName.disabled = false;
	email.disabled = false;
	password.disabled = false;
	conformPassword.disabled = false;
	country.disabled = false;
	// code.disabled = false;
	phone.disabled = false;
	yes.disabled = false;
	no.disabled = false;
	message.disabled = false;
	textCount.disabled = false;
	// dob.disabled = false;
	submit.disabled = false;
};

//  !Calculate Age function Declaration
dob.addEventListener("change", function () {
	let birthday = new Date(dob.value);
	let diff = Date.now() - birthday.getTime();
	let ageDate = new Date(diff);
	let ageYear = ageDate.getUTCFullYear();
	let age = Math.abs(ageYear - 1970);
	console.log(age);
	if (age < 18) {
		addDisableAttribute();
		setErrorMsg(dob, "Your age must be over 18 years old");
		popupContainer.style.display = "block";
	} else {
		removeDisableAttribute();
		setSuccessMsg(dob);
	}
});

close.addEventListener("click", function () {
	popupContainer.style.display = "none";
});

// ! Validation functions Declaration
function validation() {
	//  !Deduct blank spaces from Start & End
	const fNameVal = fName.value.trim();
	const lNameVal = lName.value.trim();
	const emailVal = email.value.trim();
	const passwordVal = password.value.trim();
	const conformPasswordVal = conformPassword.value.trim();
	const phoneVal = phone.value.trim();
	const yesVal = yes.checked;
	const noVal = no.checked;
	const messageVal = message.value.trim();

	const dobVal = dob.value;
	const countryValue = country.value;

	const emailRegex = /^\w+([\.-]?\w+)*[^_]@[^_]\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}$/;
	const phoneRegex = /^[0-9]{10}$/;

	// Age Calculations
	let birthday = new Date(dob.value);
	let diff = Date.now() - birthday.getTime();
	let ageDate = new Date(diff);
	let ageYear = ageDate.getUTCFullYear();
	let age = Math.abs(ageYear - 1970);

	if (fNameVal === "") {
		setErrorMsg(fName, "First Name can not be Blank");
	} else if (fNameVal.length <= 2) {
		setErrorMsg(fName, "First Name Length must be more than 2 characters");
	} else {
		setSuccessMsg(fName);
	}

	if (lNameVal === "") {
		setErrorMsg(lName, "Last Name can not be Blank");
	} else if (lNameVal.length <= 2) {
		setErrorMsg(lName, "Last Name Length must be more than 2 characters");
	} else {
		setSuccessMsg(lName);
	}

	if (dobVal === "") {
		setErrorMsg(dob, "Last Name can not be Blank");
	} else if (age <= 18) {
		setErrorMsg(dob, "Your age must be over 18 years old");
	} else {
		setSuccessMsg(dob);
	}

	if (emailVal === "") {
		setErrorMsg(email, "Last Name can not be Blank");
	} else if (!emailVal.match(emailRegex)) {
		setErrorMsg(email, "Enter a valid email address");
	} else {
		setSuccessMsg(email);
	}

	if (passwordVal === "") {
		setErrorMsg(password, "Last Name can not be Blank");
	} else if (!passwordVal.match(passRegex)) {
		setErrorMsg(password, "Password must be at least 1 Digits 1 Lowercase 1 Uppercase and length must be at least 8 to 16 Digits");
	} else {
		setSuccessMsg(password);
	}

	if (conformPasswordVal === "") {
		setErrorMsg(conformPassword, "Last Name can not be Blank");
	} else if (conformPasswordVal !== passwordVal) {
		setErrorMsg(conformPassword, "Conform password does not match with password");
	} else {
		setSuccessMsg(conformPassword);
	}

	if (countryValue === "") {
		setErrorMsg(country, "Select your country!!");
	} else {
		code.value = Number(countryValue);
		setSuccessMsg(country);
	}

	if (phoneVal === "") {
		setErrorMsg(phoneWrap, "Last Name can not be Blank");
	} else if (!phoneVal.match(phoneRegex)) {
		setErrorMsg(phoneWrap, "Please enter a valid Phone number");
	} else {
		setSuccessMsg(phoneWrap);
	}

	if (!yesVal === true && !noVal === true) {
		setErrorMsg(inputOption, "Last Name can not be Blank");
	} else {
		setSuccessMsg(inputOption);
	}

	let textCounterValue = 100;
	textCount.textContent = textCounterValue;

	if (messageVal === "") {
		setErrorMsg(message, "Last Name can not be Blank");
	} else if (messageVal.length <= 50) {
		setErrorMsg(message, "Massage Length must be 50 characters");
	} else {
		setSuccessMsg(message);
	}
}
