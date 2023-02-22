import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GameObject, PlayerPrefs } from 'UnityEngine';

export default class MainData extends ZepetoScriptBehaviour {

    public CloudCnt: int = 0;
    public TotalScore: int = 0;
    public Life: int = 3;
    public QuizType: string = "guest";

    Start() {
        this.Load();
    }

    public Save() {
        PlayerPrefs.SetInt("CloudCnt", this.CloudCnt);
    }

    public Load() {
        if (PlayerPrefs.HasKey("CloudCnt")) {
            this.CloudCnt = PlayerPrefs.GetInt("CloudCnt");
        }
    }
}