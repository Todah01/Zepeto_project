import { GameObject, Vector3, Mathf, Sprite, AudioClip } from 'UnityEngine';
import { Button, Image } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import FallChecking from '../../ZepetoScripts/MultiplaySync/Sample Code/FallChecking';
import MainData from '../Data/MainData';
import Timer_control from '../Object/Timer_control';
import AudioManager from './AudioManager';

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
    public clip: AudioClip;

    private optionUICheck: boolean = false;

    Start() {
        this.btn_retry.onClick.AddListener(() => {
            AudioManager.GetInstance().SFXPlay("btnTouch", this.clip);
            this.gameOn();
        });
        this.btn_exit.onClick.AddListener(() => {
            AudioManager.GetInstance().SFXPlay("btnTouch", this.clip);
            this.ExitWorld();
        });
        this.btn_option.onClick.AddListener(() => {
            AudioManager.GetInstance().SFXPlay("btnTouch", this.clip);
            if (this.optionUICheck)
                this.optionOff();
            else
                this.optionOn();
        });
        this.opbtn_sound.onClick.AddListener(() => {
            AudioManager.GetInstance().SFXPlay("btnTouch", this.clip);
            this.bgsoundOff();
        }); 
        this.opbtn_friends.onClick.AddListener(() => {
            AudioManager.GetInstance().SFXPlay("btnTouch", this.clip);
            
        });
        this.opbtn_exit.onClick.AddListener(() => {
            AudioManager.GetInstance().SFXPlay("btnTouch", this.clip);
            this.ExitWorld();
        });
    }

    public gameOn() {
        // AudioManager.GetInstance().BgSoundPlay(AudioManager.GetInstance().baseBg);
        // console.log("bgm : " + AudioManager.GetInstance().baseBg.name);
        this.ResetSetting();
        this.gameover_ui.SetActive(false);
        this.game_ui.SetActive(true);
        this.Timer.GetComponent<Timer_control>().ResetSetting();
        this.MainData.GetComponent<MainData>().ResetSetting();
        this.FallChecking.GetComponent<FallChecking>().ResetPosition(this.spawnposition);
        this.gameoverField.SetActive(false);
    }

    public gameOff() {
        // console.log("bgm : " + AudioManager.GetInstance().endBg.name);
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
        AudioManager.GetInstance().BgSoundStop();
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