import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button } from 'UnityEngine.UI';
import { GameObject } from 'UnityEngine';

export default class QuizManager extends ZepetoScriptBehaviour {

    public quiz_ui: GameObject;
    public quiz_select_tab: GameObject;
    public quiz_quiz_tab: GameObject;
    public btn_easy: Button;
    public btn_medium: Button;
    public btn_hard: Button;

    Start() {
        this.btn_easy.onClick.AddListener(() => {
            this.quiz_select_tab.SetActive(false);
            this.quiz_quiz_tab.SetActive(true);
        });

        this.btn_medium.onClick.AddListener(() => {
            this.quiz_select_tab.SetActive(false);
            this.quiz_quiz_tab.SetActive(true);
        });

        this.btn_hard.onClick.AddListener(() => {
            this.quiz_select_tab.SetActive(false);
            this.quiz_quiz_tab.SetActive(true);
        });
    }

    quiz_start() {
        this.quiz_ui.SetActive(true);
    }

    quiz_reset() {
        this.quiz_ui.SetActive(false);
        this.quiz_quiz_tab.SetActive(false);
        this.quiz_select_tab.SetActive(true);
    }
}