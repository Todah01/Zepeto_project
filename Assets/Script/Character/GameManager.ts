import { GameObject, Vector3, Mathf, Sprite, AudioClip } from 'UnityEngine';
import { Button, Image } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import FallChecking from '../../ZepetoScripts/MultiplaySync/Sample Code/FallChecking';
import MainData from '../Data/MainData';
import GameClearUI_control from '../Object/GameClearUI_control';
import Timer_control from '../Object/Timer_control';
import AudioManager from './AudioManager';

export enum GameStateEnum {
    GameStay,
    GamePlay,
    GamePause,
    GameClear,
    GameOver,
}

export default class GameManager extends ZepetoScriptBehaviour {

    public GameState: GameStateEnum;
    public lifeBox: Image[] = [];
    public btn_retry: Button;
    public btn_exit: Button;
    public btn_option: Button;
    public btn_continue: Button;
    public btn_next: Button;
    public opbtn_friends: Button;
    public opbtn_sound: Button;
    public opbtn_exit: Button;

    public game_ui: GameObject;
    public gameover_ui: GameObject;
    public option_ui: GameObject;
    public sound_ui: GameObject;
    public MainData: GameObject;
    public Timer: GameObject;
    public gameoverField: GameObject;
    public FallChecking: GameObject;
    public GameEndObj: GameObject;

    public spawnposition: Vector3;
    public lifeOnImg: Sprite;
    public IifeOffImg: Sprite;
    public CurrentLifeCnt: number;
    public btnTouchClip: AudioClip;

    private optionUICheck: boolean = false;
    private optionbgmOff: boolean = false;

    Start() {
        if (this.MainData.GetComponent<MainData>().isClear == 0)
            this.GameState = GameStateEnum.GamePlay;
        else
            this.SetQuizOn(true);

        this.btn_continue.onClick.AddListener(() => {
            AudioManager.instance.SFXPlay("btnTouch", this.btnTouchClip);
            this.gameContinue();
        });

        this.btn_retry.onClick.AddListener(() => {
            AudioManager.instance.SFXPlay("btnTouch", this.btnTouchClip);
            this.gameOn();
        });
        this.btn_exit.onClick.AddListener(() => {
            AudioManager.instance.SFXPlay("btnTouch", this.btnTouchClip);
            this.ExitWorld();
        });
        this.btn_option.onClick.AddListener(() => {
            AudioManager.instance.SFXPlay("btnTouch", this.btnTouchClip);
            if (this.optionUICheck)
                this.optionOff();
            else
                this.optionOn();
        });
        this.opbtn_sound.onClick.AddListener(() => {
            AudioManager.instance.SFXPlay("btnTouch", this.btnTouchClip);
            if (this.optionbgmOff) {
                AudioManager.instance.BgSoundReplay();
                this.sound_ui.SetActive(true);
                this.optionbgmOff = false;
            }
            else {
                AudioManager.instance.BgSoundPause();
                this.sound_ui.SetActive(false);
                this.optionbgmOff = true;
            }  
        }); 
        this.opbtn_friends.onClick.AddListener(() => {
            AudioManager.instance.SFXPlay("btnTouch", this.btnTouchClip);
            
        });
        this.opbtn_exit.onClick.AddListener(() => {
            AudioManager.instance.SFXPlay("btnTouch", this.btnTouchClip);
            this.ExitWorld();
        });
    }

    public gameContinue() {
        this.FallChecking.GetComponent<FallChecking>().ResetPosition(this.spawnposition);
        this.gameoverField.SetActive(false);
        this.game_ui.SetActive(true);
        this.gameover_ui.SetActive(false);
        AudioManager.instance.BgSoundStop();
        AudioManager.instance.BgSoundPlay(AudioManager.instance.baseBg);
    }

    public gameOn() {
        this.GameState = GameStateEnum.GamePlay;
        this.ResetSetting();
        this.gameover_ui.SetActive(false);
        this.gameover_ui.GetComponent<GameClearUI_control>().ResetSetting();
        this.game_ui.SetActive(true);
        // this.Timer.GetComponent<Timer_control>().ResetSetting();
        this.MainData.GetComponent<MainData>().ResetSetting();
        this.FallChecking.GetComponent<FallChecking>().ResetPosition(this.spawnposition);
        this.gameoverField.SetActive(false);
        AudioManager.instance.BgSoundStop();
        AudioManager.instance.BgSoundPlay(AudioManager.instance.baseBg);
    }

    public gameOff() {
        AudioManager.instance.BgSoundStop();
        AudioManager.instance.BgSoundPlay(AudioManager.instance.endBg);
        this.game_ui.SetActive(false);
        this.gameover_ui.SetActive(true);

        if (this.CurrentLifeCnt == 0) {
            this.GameState = GameStateEnum.GameOver;
            this.gameover_ui.GetComponent<GameClearUI_control>().SetGameLogo("Over");
        }
        else if (this.CurrentLifeCnt > 0) {
            this.GameState = GameStateEnum.GameClear;
            this.MainData.GetComponent<MainData>().isClear = 1;
            this.gameover_ui.GetComponent<GameClearUI_control>().SetGameLogo("Clear");
            this.MainData.GetComponent<MainData>().StarCntEvent.Invoke();
        }
        // this.Timer.GetComponent<Timer_control>().timerOn = false;
    }

    public SetQuizOn(check: boolean) {
        this.GameEndObj.SetActive(check);
    }

    public ResetSetting() {
        this.SetQuizOn(false);
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