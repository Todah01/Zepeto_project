import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Collider, Collision, Debug, GameObject, LayerMask, Mathf } from 'UnityEngine';
import QuizManager from './QuizManager';
import ProgressBar_control from './ProgressBar_control';
import MainData from '../Data/MainData';

export default class Quiz_trigger_control extends ZepetoScriptBehaviour {

    public QuizManager: GameObject;
    public progressBar_quiz: GameObject;
    public MainData: GameObject;
    public gameover_ui: GameObject;
    public player_layer: number;
    public quiz_gage: number;

    private quiz_manager: QuizManager;
    private quiz_progressBar: ProgressBar_control;
    private mainData: MainData;
    private quiz_check: boolean = true;

    Start() {
        this.quiz_manager = this.QuizManager.GetComponent<QuizManager>();
        this.quiz_progressBar = this.progressBar_quiz.GetComponent<ProgressBar_control>();
        this.mainData = this.MainData.GetComponent<MainData>();
    }

    OnTriggerEnter(coll: Collider) {
        if (coll.gameObject.layer == this.player_layer) {
            this.progressBar_quiz.SetActive(true);
        }
    }

    OnTriggerStay(coll: Collider) {
        if (coll.gameObject.layer == this.player_layer) {
            if (this.quiz_check && this.quiz_progressBar.current == this.quiz_progressBar.maximum) {
                this.progressBar_quiz.SetActive(false);
                if (this.mainData.isClear == 0) {
                    this.quiz_manager.normal_quiz_start();
                    this.quiz_check = false;
                }
                else if (this.mainData.isClear == 1){
                    this.gameover_ui.SetActive(true);
                }
            }
            else {
                this.quiz_progressBar.current = Mathf.Min(this.quiz_progressBar.maximum, this.quiz_progressBar.current + this.quiz_gage);
            }
        }
    }

    OnTriggerExit(coll: Collider) {
        this.gameover_ui.SetActive(false);
        this.progressBar_quiz.SetActive(false);
        this.quiz_progressBar.current = 0;
        this.quiz_check = true;
        this.quiz_manager.normal_quiz_end();
    }
}