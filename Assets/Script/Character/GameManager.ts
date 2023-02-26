import { GameObject, Vector3, Mathf, Sprite } from 'UnityEngine';
import { Button, Image } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import FallChecking from '../../ZepetoScripts/MultiplaySync/Sample Code/FallChecking';
import MainData from '../Data/MainData';
import Timer_control from '../Object/Timer_control';

export default class GameManager extends ZepetoScriptBehaviour {

    public lifeBox: Image[] = [];
    public btn_retry: Button;
    public btn_exit: Button;
    public btn_option: Button;
    public opbtn_friends: Button;
    public opbtn_sound: Button;
    public opbtn_exit: Button;
    public game_ui: GameObject;
    public gameover_ui: GameObject;
    public option_ui: GameObject;
    public MainData: GameObject;
    public Timer: GameObject;
    public gameoverField: GameObject;
    public FallChecking: GameObject;
    public spawnposition: Vector3;
    public lifeOnImg: Sprite;
    public IifeOffImg: Sprite;
    public CurrentLifeCnt: number;

    private optionUICheck: boolean = false;

    Start() {
        this.btn_retry.onClick.AddListener(() => {
            this.gameOn();
        });
        this.btn_exit.onClick.AddListener(() => {
            this.ExitWorld();
        });
        this.btn_option.onClick.AddListener(() => {
            if (this.optionUICheck)
                this.optionOff();
            else
                this.optionOn();
        });
        this.opbtn_sound.onClick.AddListener(() => {
            this.bgsoundOff();
        }); 
        this.opbtn_friends.onClick.AddListener(() => {
            
        });
        this.opbtn_exit.onClick.AddListener(() => {
            this.ExitWorld();
        });
    }

    public gameOn() {
        this.ResetSetting();
        this.gameover_ui.SetActive(false);
        this.game_ui.SetActive(true);
        this.Timer.GetComponent<Timer_control>().ResetSetting();
        this.MainData.GetComponent<MainData>().ResetSetting();
        this.FallChecking.GetComponent<FallChecking>().ResetPosition(this.spawnposition);
        this.gameoverField.SetActive(false);
    }

    public gameOff() {
        this.game_ui.SetActive(false);
        this.gameover_ui.SetActive(true);
        this.Timer.GetComponent<Timer_control>().timerOn = false;
    }

    public ResetSetting() {
        this.CurrentLifeCnt = this.lifeBox.length;
        for (let idx = 0; idx < this.lifeBox.length; idx++)
            this.lifeBox[idx].sprite = this.lifeOnImg;
    }

    public LifeChecking(command: string) {
        if (command == "LifeCheck") {
            this.CurrentLifeCnt = Mathf.Max(0, this.CurrentLifeCnt - 1);
            this.MainData.GetComponent<MainData>().Save();
        }
        
        for (let idx = this.lifeBox.length; idx > this.CurrentLifeCnt; idx--)
            this.lifeBox[idx - 1].sprite = this.IifeOffImg;
    }

    private bgsoundOff() {

    }

    private optionOn() {
        this.optionUICheck = true;
        this.option_ui.SetActive(true);
    }

    private optionOff() {
        this.optionUICheck = false;
        this.option_ui.SetActive(false);
    }

    private ExitWorld() {

    }
}