export function validationError(request, h, error) {
  console.log(error.message);

  // Return a response
  return h.response({
    message: "Invalid input",
    details: error.details,
  }).code(400); // bad request
}
