import { GameObject, Vector3 } from 'UnityEngine';
import { Button } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import FallChecking from '../../ZepetoScripts/MultiplaySync/Sample Code/FallChecking';
import MainData from '../Data/MainData';
import Timer_control from '../Object/Timer_control';

export default class GameManager extends ZepetoScriptBehaviour {
    public btn_retry: Button;
    public btn_exit: Button;
    public game_ui: GameObject;
    public gameover_ui: GameObject;
    public MainData: GameObject;
    public Timer: GameObject;
    public gameoverField: GameObject;
    public FallChecking: GameObject;
    public spawnposition: Vector3;

    Start() {
        this.btn_retry.onClick.AddListener(() => {
            this.gameOn();
        });
        this.btn_exit.onClick.AddListener(() => {
            this.ExitWorld();
        });
    }

    public gameOn() {
        this.gameover_ui.SetActive(false);
        this.game_ui.SetActive(true);
        this.MainData.GetComponent<MainData>().TotalScore = 0;
        this.Timer.GetComponent<Timer_control>().timeValue = 1800;
        this.Timer.GetComponent<Timer_control>().timerOn = true;
        this.FallChecking.GetComponent<FallChecking>().ResetPosition(this.spawnposition);
        this.gameoverField.SetActive(false);
    }

    public gameOff() {
        this.game_ui.SetActive(false);
        this.gameover_ui.SetActive(true);
        this.Timer.GetComponent<Timer_control>().timerOn = false;
    }

    private ExitWorld() {

    }
}