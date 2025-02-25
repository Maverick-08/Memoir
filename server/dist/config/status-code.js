"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["RequestSuccessfull"] = 200] = "RequestSuccessfull";
    StatusCode[StatusCode["ResourceCreated"] = 201] = "ResourceCreated";
    StatusCode[StatusCode["SuccessfullNoContent"] = 204] = "SuccessfullNoContent";
    StatusCode[StatusCode["BadRequest"] = 400] = "BadRequest";
    StatusCode[StatusCode["Unauthorized"] = 401] = "Unauthorized";
    StatusCode[StatusCode["Forbidden"] = 403] = "Forbidden";
    StatusCode[StatusCode["Conflict"] = 409] = "Conflict";
    StatusCode[StatusCode["ServerError"] = 500] = "ServerError";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
