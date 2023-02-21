import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button } from 'UnityEngine.UI';
import { GameObject } from 'UnityEngine';
import MainData from '../Data/MainData';

export default class QuizManager extends ZepetoScriptBehaviour {

    public CloudCntData: GameObject;
    public quiz_ui: GameObject;
    public normal_quiz_ui: GameObject;
    public normal_quiz_select_tab: GameObject;
    public normal_quiz_quiz_tab: GameObject;
    public normal_quiz_hint_1: GameObject;
    public normal_quiz_hint_2: GameObject;
    public custom_quiz_ui: GameObject;
    public custom_quiz_select_tab: GameObject;
    public custom_quiz_quiz_tab: GameObject;
    public btn_easy: Button;
    public btn_medium: Button;
    public btn_hard: Button;
    public btn_hint: Button;
    public btn_host: Button;
    public btn_guest: Button;

    public host_btn_complete: Button;
    public host_title_input: Text;
    public host_description_input: Text;
    public host_answer: Text;

    public guest_btn_complete: Button;
    public guest_title: Text;
    public guest_description: Text;
    public guest_answer: Text;

    public cur_title: string = "";
    public cur_question: string = "";
    private cur_answer: string = "";

    private cloud_cnt: int = 0;
    private hint_cnt: int = 0;
    private check_host: bool = false;
    private guest_cnt: int = 0;

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
            this.cloud_cnt = this.CloudCntData.GetComponent<MainData>().CloudCnt;

            if (this.hint_cnt < 2 && this.cloud_cnt > 0) {
                this.hint_cnt += 1;
                this.CloudCntData.GetComponent<MainData>().CloudCnt -= 1;

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
            this.CloudCntData.GetComponent<MainData>().QuizType = "host";
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
    public normal_quiz_start() {
        this.quiz_ui.SetActive(true);
        this.normal_quiz_ui.SetActive(true);
    }

    public normal_quiz_end() {
        this.quiz_ui.SetActive(false);
        this.normal_quiz_ui.SetActive(false);
        this.normal_quiz_quiz_tab.SetActive(false);
        this.normal_quiz_select_tab.SetActive(true);
    }

    // Custom quiz trigger event.
    public custom_quiz_start() {
        this.quiz_ui.SetActive(true);
        this.custom_quiz_ui.SetActive(true);
    }

    public custom_quiz_end() {
        this.quiz_ui.SetActive(false);
        this.custom_quiz_ui.SetActive(false);
        this.custom_quiz_quiz_tab.SetActive(false);
        this.custom_quiz_select_tab.SetActive(true);
    }
}