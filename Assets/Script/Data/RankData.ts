import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Text } from 'UnityEngine.UI';

export default class RankData extends ZepetoScriptBehaviour {

    public rank: number;
    public userName: string;
    public score: number;
    public rank_txt: Text;
    public userName_txt: Text;
    public score_txt: Text;

    public SetInfoText() {
        this.rank_txt.text = this.rank.toString();
        this.userName_txt.text = this.userName;
        this.score_txt.text = this.score.toString();
    }
}