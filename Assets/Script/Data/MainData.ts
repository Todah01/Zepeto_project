import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoWorldHelper } from 'ZEPETO.World';
import { GameObject, PlayerPrefs } from 'UnityEngine';
import { SetScoreResponse, LeaderboardAPI } from 'ZEPETO.Script.Leaderboard';
import { Button, Text, Image } from 'UnityEngine.UI';
import { Texture, Texture2D, Sprite, Rect, Vector2 } from 'UnityEngine';
import { Player } from 'ZEPETO.Multiplay.Schema';
import { List$1 } from 'System.Collections.Generic';
import { UnityEvent } from 'UnityEngine.Events';
import Heart_control from '../Object/Heart_control';
import GameManager from '../Character/GameManager';
import GameClearUI_control from '../Object/GameClearUI_control';

export default class MainData extends ZepetoScriptBehaviour {

    @SerializeField() private listCloud: GameObject[] = [];
    @SerializeField() private listCheck: number[] = [];
    // public userId: string;
    public leaderboardId: string;
    public CloudCnt: number;
    public bestScore: number;
    public CurrentScore: number;
    public StarCnt: number;
    public GameManager: GameObject;
    public GameOverManager: GameObject;
    // public Life: number = 3;
    public cloudCnt_txt: Text;
    public currentScore_txt: Text;
    public sampleImage: Image;
    public StarCntEvent: UnityEvent;

    Start() {
        // Set Event
        this.StarCntEvent = new UnityEvent();
        this.StarCntEvent.AddListener(() => this.StarCntPlus());
        this.StarCntEvent.AddListener(() => this.GameOverManager.GetComponent<GameClearUI_control>().StarSetting(this.StarCnt));

        // Set Data
        this.Load();
        this.SetData();
        // Set life img
        //ZepetoWorldHelper.GetProfileTexture(this.userId, (texture: Texture) => {
        //    this.sampleImage.sprite = this.GetSprite(texture);

        //}, (error) => {
        //    console.error(error);
        //});
    }

    private StarCntPlus() {
        this.StarCnt++;
        if (this.CloudCnt > 25) this.StarCnt++;
        if (this.GameManager.GetComponent<GameManager>().CurrentLifeCnt == 3) this.StarCnt++;
    }

    public CheckGameEnd() {
        if (this.CloudCnt >= 15) {
            this.GameManager.GetComponent<GameManager>().SetQuizOn(true);
        }
    }

    public ResetSetting() {
        this.CurrentScore = 0;
        this.CloudCnt = 0;
        for (let idx = 0; idx < this.listCloud.length; idx++) {
            if (this.listCloud[idx].transform.GetChild(0).GetComponent<Heart_control>().cloud_off) {
                this.listCloud[idx].transform.GetChild(0).GetComponent<Heart_control>().cloud_off = 0;
            }
            this.listCheck[idx] = 0;
        }

        this.SetData();
        this.Save();
        this.Load();
    }

    public Save() {
        for (let idx = 0; idx < this.listCloud.length; idx++) {
            if (this.listCloud[idx].transform.GetChild(0).GetComponent<Heart_control>().cloud_off) {
                this.listCheck[idx] = 1;
            }
        }

        let strArr = "";

        for (let idx = 0; idx < this.listCheck.length; idx++) {
            strArr = strArr + this.listCheck[idx].toString();
            if (idx < this.listCheck.length - 1) {
                strArr = strArr + ',';
            }
        }

        // console.log(strArr);

        PlayerPrefs.SetInt("CloudCnt", this.CloudCnt);
        PlayerPrefs.SetInt("CurrentScore", this.CurrentScore);
        PlayerPrefs.SetInt("CurrentLifeCnt", this.GameManager.GetComponent<GameManager>().CurrentLifeCnt);
        // PlayerPrefs.SetInt("BestScore", this.bestScore < this.CurrentScore ? this.CurrentScore : this.bestScore);
        PlayerPrefs.SetString("listCloudCheck", strArr);
    }

    public Load() {
        if (PlayerPrefs.HasKey("CurrentLifeCnt")) {
            if (PlayerPrefs.GetInt("CurrentLifeCnt") == 0) {
                this.GameManager.GetComponent<GameManager>().CurrentLifeCnt = 3;
                this.CloudCnt = 0;
                this.CurrentScore = 0;
            }
            else {
                this.GameManager.GetComponent<GameManager>().CurrentLifeCnt = PlayerPrefs.GetInt("CurrentLifeCnt");

                if (PlayerPrefs.HasKey("CloudCnt")) {
                    this.CloudCnt = PlayerPrefs.GetInt("CloudCnt");
                }

                if (PlayerPrefs.HasKey("CurrentScore")) {
                    this.CurrentScore = PlayerPrefs.GetInt("CurrentScore");
                }
            }
        }

        if (PlayerPrefs.HasKey("listCloudCheck")) {
            let dataArr = PlayerPrefs.GetString("listCloudCheck").split(',');

            for (let idx = 0; idx < dataArr.length; idx++) {
                this.listCheck[idx] = parseInt(dataArr[idx]);
            }
        }

        if (PlayerPrefs.HasKey("BestScore")) {
            this.bestScore = PlayerPrefs.GetInt("BestScore");
        }

        for (let idx = 0; idx < this.listCloud.length; idx++) {
            if (this.listCheck[idx]) {
                this.listCloud[idx].transform.GetChild(0).gameObject.SetActive(false);
            }
            else {
                this.listCloud[idx].transform.GetChild(0).GetComponent<Heart_control>().cloud_off = 0;
                this.listCloud[idx].transform.GetChild(0).gameObject.SetActive(true);
            }
        }
    }

    public SetData() {
        this.cloudCnt_txt.text = this.CloudCnt.toString();
        this.currentScore_txt.text = this.CurrentScore.toString();
        this.GameManager.GetComponent<GameManager>().LifeChecking("SetData");
    }

    public SetScoreToLeaderboard() {
        // LeaderboardAPI.SetScore(this.leaderboardId, this.TotalScore, this.OnResult, this.OnError);
        PlayerPrefs.SetInt("BestScore", this.bestScore < this.CurrentScore ? this.CurrentScore : this.bestScore);
    }

    private GetSprite(texture: Texture) {
        let rect: Rect = new Rect(0, 0, texture.width, texture.height);
        return Sprite.Create(texture as Texture2D, rect, new Vector2(0.5, 0.5));
    }

    private OnResult(result: SetScoreResponse) {
        console.log(`result.isSuccess: ${result.isSuccess}`);
    }

    private OnError(error: string) {
        console.error(error);
    }
}