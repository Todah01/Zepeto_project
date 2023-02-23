import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GameObject, PlayerPrefs } from 'UnityEngine';
import { SetScoreResponse, LeaderboardAPI } from 'ZEPETO.Script.Leaderboard';
import { Button, Text } from 'UnityEngine.UI';

export default class MainData extends ZepetoScriptBehaviour {

    public leaderboardId: string;
    public CloudCnt: int = 1;
    public TotalScore: int = 100;
    public Life: int = 3;
    public cloudcnt_txt: Text;
    public totalscore_txt: Text;

    Start() {
        LeaderboardAPI.SetScore(this.leaderboardId, this.TotalScore, this.OnResult, this.OnError);
        this.Load();
        this.SetScore();
    }

    public Save() {
        PlayerPrefs.SetInt("CloudCnt", this.CloudCnt);
    }

    public Load() {
        if (PlayerPrefs.HasKey("CloudCnt")) {
            this.CloudCnt = PlayerPrefs.GetInt("CloudCnt");
        }
    }

    public SetScore() {
        this.cloudcnt_txt.text = this.CloudCnt.toString();
        this.totalscore_txt.text = this.TotalScore.toString();
        this.Save();
    }

    private OnResult(result: SetScoreResponse) {
        console.log(`result.isSuccess: ${result.isSuccess}`);
    }

    private OnError(error: string) {
        console.error(error);
    }
}