function isEmpty(value) {
  return !value || value.trim() === "";
}

function userCredentialsAreValid(email, password, role, phone) {
  return (
    email &&
    email.includes("@") &&
    password &&
    password.trim().length >= 8 &&
    role &&
    (role.trim() === "seller" ||
      role.trim() === "admin" ||
      role.trim() === "customer") &&
    phone &&
    phone.trim().length == 10
  );
}

function userDetailsAreValid(email, password, name, role, phone) {
  return (
    userCredentialsAreValid(email, password, role, phone) && !isEmpty(name)
  );
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
};
