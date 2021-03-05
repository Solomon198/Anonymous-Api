/**
 * @api {post} /profile/  Add new profile
 * @apiName Profile
 * @apiGroup Profile
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {String} phoneNumber users phone number.
 * @apiParam {String} countryCode two letter country code of user in uppercase e.g NG for Nigeria.
 * @apiParam {String} firstName users first name
 * @apiParam {String} lastName users last name
 * @apiParam {String} sex users sex e.g male or female
 * @apiParam {String} userId  Id of the user gotten on signup
 *
 *
 * @apiSuccess {String} message status message text
 * @apiSuccess {Object} payload object that contains all user props
 * @apiSuccess {String} payload.userId  The user Id.
 * @apiSuccess {String} payload.firstName  The user first name.
 * @apiSuccess {String} payload.lastName The user last name
 * @apiSuccess {String} payload.sex The sex of the user
 * @apiSuccess {String} payload.bio The biography of the user
 * @apiSuccess {String} payload.phoneNumber The users phone number
 * @apiSuccess {String} payload.email The user email
 * @apiSuccess {Boolean} payload.showPhoneNumber privacy settings of user to show number or not
 * @apiSuccess {Boolean} payload.showEmail privacy setting setting of user to show bio or not
 * @apiSuccess {Object} payload.avatar Object of the profile photo of user
 * @apiSuccess {String} payload.avatar.thumbnail profile placeholder color
 * @apiSuccess {String} payload.avatar.url The user uploaded profile photo
 * @apiSuccess {Object} payload.coverPhoto Object containing cover photo infomations
 * @apiSuccess {String} payload.coverPhoto.thumbnail cover photo placeholder color
 * @apiSuccess {String} payload.coverPhoto.url The user uploaded cover photo
 * @apiSuccess {String} payload.address The address of the user by name
 * @apiSuccess {Object} payload.addressCoords Object containing address coordinates of the user
 * @apiSuccess {String} payload.addressCoords.type type of coordinate e.g Point
 * @apiSuccess {Number[]} payload.addressCoords.coordinates longitude and latitude of use e.g [longitude,latitude]
 * @apiSuccess {Object} payload.businessAddressCoords Object containing the business address coordinates of the user
 * @apiSuccess {String} payload.businessAddressCoords.type type of coordinate e.g Point
 * @apiSuccess {Number[]} payload.businessAddressCoords.coordinates longitude and latitude of use e.g [longitude,latitude]
 * @apiSuccess {String} payload.businessAddress user business address string
 * @apiSuccess {String} payload.businessAddressDescription user business address additional description
 * @apiSuccess {String[]} payload.businessPhotos user business photos
 *
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFUL",
 *       "userId": "kdkf499949dk9e9w9wj39djdjj",
 *       "firstName": "David",
 *       "lastName": "Moses",
 *       "sex": "Male",
 *       "bio": "Developer and lab scientist",
 *       "phoneNumber": "+23490200000002",
 *       "email": "example@gmail.com",
 *       "showPhoneNumber": true,
 *       "showEmail": false,
 *       "avatar": {
 *           "url":"https://url-image.com",
 *           "thumbnail":"https://url-image.com"
 *        },
 *       "coverPhoto": {
 *           "url":"https://url-image.com",
 *           "thumbnail":"https://url-image.com"
 *        },
 *       "address": "No 5 kaduna road apapa lagos state",
 *       "addressCoords": {
 *            "type"  : "Point"
 *            "coordinates" : [78.7373837,84.883838]
 *        },
 *
 *       "businessAddressCoords":  {
 *            "type"  : "Point"
 *            "coordinates" : [78.7373837,84.883838]
 *        },
 *
 *       "businessAddress": "No 49 avenue street apap",
 *       "businessAddressDescription": "Opposite Hamdala Swimming pool",
 *       "businessPhotos": ["https://me.to/photo1"]
 *     }
 *
 * @apiError InvalidInput Invalid input parameters.
 * @apiErrorExample InvalidInput:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "error": "INVALID.INPUT",
 *        "message": "describes error"
 *     }
 *
 * @apiError ServerError Internal server error.
 * @apiErrorExample Internal-Server-Error:
 *     HTTP/1.1 500 Internal server error
 *     {
 *        "error": "SERVER.ERROR",
 *        "mesage": "describes error"
 *     }
 *
 *
 *
 */
