"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ZEPETO_Script_1 = require("ZEPETO.Script");
const UnityEngine_1 = require("UnityEngine");
const MainData_1 = require("../Data/MainData");
class QuizManager extends ZEPETO_Script_1.ZepetoScriptBehaviour {
    constructor() {
        super(...arguments);
        this.cur_title = "";
        this.cur_question = "";
        this.cur_answer = "";
        this.cloud_cnt = 0;
        this.hint_cnt = 0;
        this.check_host = false;
        this.guest_cnt = 0;
    }
    Start() {
        // Normal Quiz UI Event.
        this.btn_easy.onClick.AddListener(() => {
            this.normal_quiz_select_tab.SetActive(false);
            this.normal_quiz_quiz_tab.SetActive(true);
        });
        this.btn_medium.onClick.AddListener(() => {
            this.normal_quiz_select_tab.SetActive(false);
            this.normal_quiz_quiz_tab.SetActive(true);
        });
        this.btn_hard.onClick.AddListener(() => {
            this.normal_quiz_select_tab.SetActive(false);
            this.normal_quiz_quiz_tab.SetActive(true);
        });
        this.btn_hint.onClick.AddListener(() => {
            this.cloud_cnt = this.CloudCntData.GetComponent($typeof(MainData_1.default)).CloudCnt;
            if (this.hint_cnt < 2 && this.cloud_cnt > 0) {
                this.hint_cnt += 1;
                this.CloudCntData.GetComponent($typeof(MainData_1.default)).CloudCnt -= 1;
                if (this.hint_cnt == 1)
                    this.normal_quiz_hint_1.SetActive(true);
                if (this.hint_cnt == 2)
                    this.normal_quiz_hint_2.SetActive(true);
            }
        });
        // Custom Quiz UI Event.
        this.btn_host.onClick.AddListener(() => {
            if (this.check_host)
                return;
            this.check_host = false;
            // this.CloudCntData.GetComponent<MainData>().QuizType = "host";
            this.custom_quiz_select_tab.SetActive(false);
            this.custom_quiz_quiz_tab.SetActive(true);
        });
        this.btn_guest.onClick.AddListener(() => {
            this.custom_quiz_select_tab.SetActive(false);
            this.custom_quiz_quiz_tab.SetActive(true);
        });
        //this.host_btn_complete.onClick.AddListener(() => {
        //});
    }
    // Normal quiz trigger event.
    normal_quiz_start() {
        this.quiz_ui.SetActive(true);
        this.normal_quiz_ui.SetActive(true);
    }
    normal_quiz_end() {
        this.quiz_ui.SetActive(false);
        this.normal_quiz_ui.SetActive(false);
        this.normal_quiz_quiz_tab.SetActive(false);
        this.normal_quiz_select_tab.SetActive(true);
    }
    // Custom quiz trigger event.
    custom_quiz_start() {
        this.quiz_ui.SetActive(true);
        this.custom_quiz_ui.SetActive(true);
    }
    custom_quiz_end() {
        this.quiz_ui.SetActive(false);
        this.custom_quiz_ui.SetActive(false);
        this.custom_quiz_quiz_tab.SetActive(false);
        this.custom_quiz_select_tab.SetActive(true);
    }
}
exports.default = QuizManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVpek1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJRdWl6TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUFxRDtBQUVyRCw2Q0FBeUM7QUFDekMsK0NBQXdDO0FBRXhDLE1BQXFCLFdBQVksU0FBUSxxQ0FBcUI7SUFBOUQ7O1FBNkJXLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDekIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUV4QixjQUFTLEdBQVEsQ0FBQyxDQUFDO1FBQ25CLGFBQVEsR0FBUSxDQUFDLENBQUM7UUFDbEIsZUFBVSxHQUFTLEtBQUssQ0FBQztRQUN6QixjQUFTLEdBQVEsQ0FBQyxDQUFDO0lBaUYvQixDQUFDO0lBL0VHLEtBQUs7UUFDRCx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNuQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDbkMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsb0JBQW9CLENBQUMs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