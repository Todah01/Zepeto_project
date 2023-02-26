"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnityEngine_1 = require("UnityEngine");
const ZEPETO_Character_Controller_1 = require("ZEPETO.Character.Controller");
const ZEPETO_Script_1 = require("ZEPETO.Script");
const PlayerSync_1 = require("../Player/PlayerSync");
const MainData_1 = require("../../../Script/Data/MainData");
const GameManager_1 = require("../../../Script/Character/GameManager");
class FallChecking extends ZEPETO_Script_1.ZepetoScriptBehaviour {
    constructor() {
        super(...arguments);
        this.lifeBox = [];
    }
    Start() {
        this.ResetSetting();
    }
    ResetSetting() {
        this.life_cnt = this.lifeBox.length;
        for (let idx = 0; idx < this.lifeBox.length; idx++)
            this.lifeBox[idx].SetActive(true);
    }
    ResetPosition(position) {
        const localCharacter = ZEPETO_Character_Controller_1.ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        localCharacter.Teleport(position, UnityEngine_1.Quaternion.identity);
    }
    OnTriggerEnter(coll) {
        if (!coll.transform.GetComponent($typeof(PlayerSync_1.default))?.isLocal) {
            return;
        }
        this.ResetPosition(this.spawnPosition);
        // console.log("life count : " + this.life_cnt);
        this.life_cnt = UnityEngine_1.Mathf.Max(0, this.life_cnt - 1);
        for (let idx = this.lifeBox.length; idx > this.life_cnt; idx--)
            this.lifeBox[idx - 1].SetActive(false);
        if (!this.life_cnt) {
            this.GameManager.GetComponent($typeof(GameManager_1.default)).gameOff();
            this.MainData.GetComponent($typeof(MainData_1.default)).SetScoreToLeaderboard();
            this.ResetSetting();
            this.GameManager.GetComponent($typeof(GameManager_1.default)).gameoverField.SetActive(true);
            this.ResetPosition(this.endPosition);
        }
    }
}
exports.default = FallChecking;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFsbENoZWNraW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRmFsbENoZWNraW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQXFGO0FBQ3JGLDZFQUFvSDtBQUNwSCxpREFBcUQ7QUFHckQscURBQThDO0FBQzlDLDREQUFxRDtBQUNyRCx1RUFBZ0U7QUFFaEUsTUFBcUIsWUFBYSxTQUFRLHFDQUFxQjtJQUEvRDs7UUFFOEIsWUFBTyxHQUFpQixFQUFFLENBQUM7SUEyQ3pELENBQUM7SUFwQ0csS0FBSztRQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU8sWUFBWTtRQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3BDLEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLGFBQWEsQ0FBQyxRQUFpQjtRQUNsQyxNQUFNLGNBQWMsR0FBRywyQ0FBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztRQUNqRixjQUFjLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSx3QkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTyxjQUFjLENBQUMsSUFBYztRQUNqQyxJQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLFNBQUMsb0JBQVUsRUFBRyxFQUFFLE9BQU8sRUFBQztZQUNuRCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV2QyxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVoRCxLQUFLLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUMxRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLFNBQUMscUJBQVcsR0FBSSxPQUFPLEVBQUUsQ0FBQztZQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksU0FBQyxrQkFBUSxHQUFJLHFCQUFxQixFQUFFLENBQUM7WUFDL0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxTQUFDLHFCQUFXLEdBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7Q0FDSjtBQTdDRCwrQkE2Q0MifQ==