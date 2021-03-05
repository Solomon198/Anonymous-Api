/**
 * @api {post} /signUp Register a user
 * @apiName RegisterUser
 * @apiGroup User
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string} phoneNumber users phone number.
 * @apiParam {string} password users account password, mininum should be 6 and should contain uppercase and lower case with at least a special character and a number.
 * @apiParam {string} countryCode two letter country code of user in uppercase e.g NG for Nigeria.
 *
 * @apiSuccess {String} statusText text description of the success status code.
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {String} userId The id of the user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "statusText": "SUCCESSFULL",
 *       "message": "SIGNUP SUCCESS",
 *       "userId":"600348193da9c4f82f85e445"
 *     }
 *
 * @apiError InvalidInput Invalid input parameters.
 * @apiErrorExample InvalidInput:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *        "error": "INVALID.PHONE | PASSWORD.STRENGTH.WEEK | INVALID.INPUT",
 *        "message": "BAD REQUEST"
 *     }
 *
 *
 * @apiError ServerError Internal server error.
 * @apiErrorExample Internal-Server-Error:
 *     HTTP/1.1 500 Internal server error
 *     {
 *        "error": "SERVER.ERROR",
 *        "mesage": "INTERNAL SERVER ERROR"
 *     }
 *
 *
 * @apiError UserExist The user already exist.
 * @apiErrorExample User-Exist:
 *     HTTP/1.1 409 Conflict
 *     {
 *        "message": "CONFLICT",
 *        "error": "USER.EXIST"
 *     }
 *
 */
