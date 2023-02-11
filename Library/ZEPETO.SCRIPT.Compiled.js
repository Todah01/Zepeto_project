"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ZEPETO_Script_1 = require("ZEPETO.Script");
class SampleScript extends ZEPETO_Script_1.ZepetoScriptBehaviour {
    Start() {
        console.log("Hello ZEPETO Script");
    }
    Update() {
        this.transform.Rotate(3, 0, 0);
    }
}
exports.default = SampleScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcmFjdGVyQ29udHJvbGxlclNhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNoYXJhY3RlckNvbnRyb2xsZXJTYW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBcUQ7QUFFckQsTUFBcUIsWUFBYSxTQUFRLHFDQUFxQjtJQUUzRCxLQUFLO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBRUo7QUFWRCwrQkFVQyJ9