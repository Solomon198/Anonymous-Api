/**
 * @api {post} /reset-password Resset user password
 * @apiName Password-Resset
 * @apiGroup Password-Resset
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string} password The verification Pin sent to phone number via call/sms.
 * @apiParam {string} accessToken Token sent after successful verification of phoneNumber.
 *
 * @apiSuccess {String} message  describes the success of the action performed.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *
 *     }
 *
 * @apiError InvalidInput Invalid input parameters.
 * @apiErrorExample InvalidInput:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *        "error": "INVALID.PHONE | INVALID.INPUT",
 *        "message": "BAD REQUEST"
 *     }
 *
 * @apiError ServerError Internal server error.
 * @apiErrorExample Internal-Server-Error:
 *     HTTP/1.1 500 Internal server error
 *     {
 *        "error": "SERVER.ERROR",
 *        "mesage": "INTERNAL SERVER ERROR"
 *     }
 *
 * @apiError UserUnauthorized The user is not unauthorized.
 * @apiErrorExample UnAuthorized:
 *     HTTP/1.1 401 Unauthorized request
 *     {
 *        "message": "UNAUTHORIZED",
 *        "error": "UNAUTHORIZED.REQUEST"
 *     }
 *
 */
