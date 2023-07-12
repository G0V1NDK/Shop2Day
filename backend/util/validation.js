function isEmpty(value) {
  return !value || value.trim() === "";
}

function userCredentialsAreValid(email, password, role) {
  return (
    email &&
    email.includes("@") &&
    password &&
    password.trim().length >= 6 &&
    role &&
    (role.trim() === "seller" ||
      role.trim() === "admin" ||
      role.trim() === "customer")
  );
}

function userDetailsAreValid(email, password, name, street, postal, city, role) {
  return (
    userCredentialsAreValid(email, password, role) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
