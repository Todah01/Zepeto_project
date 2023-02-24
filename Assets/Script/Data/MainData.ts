import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoWorldHelper } from 'ZEPETO.World';
import { GameObject, PlayerPrefs } from 'UnityEngine';
import { SetScoreResponse, LeaderboardAPI } from 'ZEPETO.Script.Leaderboard';
import { Button, Text, Image } from 'UnityEngine.UI';
import { Texture, Texture2D, Sprite, Rect, Vector2 } from 'UnityEngine';
import { Player } from 'ZEPETO.Multiplay.Schema';

export default class MainData extends ZepetoScriptBehaviour {

    public userId: string;
    public leaderboardId: string;
    public CloudCnt: int = 1;
    public TotalScore: int = 100;
    public Life: int = 3;
    public cloudcnt_txt: Text;
    public totalscore_txt: Text;
    public sampleImage: Image;

    private player: Player;

    Start() {
        // Set Data
        LeaderboardAPI.SetScore(this.leaderboardId, this.TotalScore, this.OnResult, this.OnError);
        // console.log(`userid : ${this.player.zepetoUserId}`);
        this.Load();
        this.SetScore();

        // Set life img
        ZepetoWorldHelper.GetProfileTexture(this.userId, (texture: Texture) => {
            this.sampleImage.sprite = this.GetSprite(texture);

        }, (error) => {
            console.error(error);
        });
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