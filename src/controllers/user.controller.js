const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createUser(req, res) {
  try {
    const user = await UserService.createUser({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.status).json(ErrorResponse);
  }
}

module.exports = {
  createUser,
};
