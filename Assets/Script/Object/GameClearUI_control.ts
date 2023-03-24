import { GameObject, Sprite, WaitForSeconds } from 'UnityEngine'
import { Image } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class GameClearUI_control extends ZepetoScriptBehaviour {

    @SerializeField() private StarList: GameObject[] = [];
    public GameClearLogo: GameObject;
    public GameOverLogo: GameObject;
    public StarOnSprite: Sprite;
    public StarOffSprite: Sprite;

    public SetGameLogo(GameState: string) {
        if (GameState == "Clear")
            this.GameClearLogo.SetActive(true);
        else if (GameState == "Over")
            this.GameOverLogo.SetActive(true);
    }

    public StarSetting(StarCnt: number) {
        this.SetStarOnOff(StarCnt);
        this.StartCoroutine(this.DoRoutine(StarCnt));
    }

    public ResetSetting() {
        this.GameClearLogo.SetActive(false);
        this.GameOverLogo.SetActive(false);
        for (let idx = 0; idx < this.StarList.length; idx++) {
            this.StarList[idx].GetComponent<Image>().sprite = this.StarOffSprite;
            this.StarList[idx].SetActive(false);
        }
    }

    SetStarOnOff(ClearCnt: number) {
        // Set Star Img
        for (let idx = 0; idx < ClearCnt; idx++) {
            this.StarList[idx].GetComponent<Image>().sprite = this.StarOnSprite;
        }
    }

    *DoRoutine(ClearCnt: number) {
        for (let idx = 0; idx < ClearCnt; idx++) {
            yield null;
            yield new WaitForSeconds(1);
            this.StarList[idx].SetActive(true);
        }
    }
}