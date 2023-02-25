import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button } from 'UnityEngine.UI';
import { GameObject } from 'UnityEngine';
import { GetRangeRankResponse, LeaderboardAPI, ResetRule } from 'ZEPETO.Script.Leaderboard';
import RankData from './RankData';

export default class RankingManager extends ZepetoScriptBehaviour {

    @SerializeField() private rank_list: GameObject[] = [];
    public btn_ranking: Button;
    public btn_exit: Button;
    public ranking_ui: GameObject;
    public myrank_list: GameObject;
    public leaderboardId: string;
    public startRank: number;
    public endRank: number;
    public bestScore: number;
    public resetRule: ResetRule;

    //public userId: string[];

    Start() {
        //LeaderboardAPI.GetRank(this.leaderboardId, this.userId, this.resetRule, false,
        //    this.OnMyBestRank, this.OnError);

        this.btn_ranking.onClick.AddListener(() => {
            //this.GetRankData();
            //this.ranking_ui.SetActive(true);
        });

        this.btn_exit.onClick.AddListener(() => {
            this.ranking_ui.SetActive(false);
        });
    }

    OnMyBestRank(result: GetRangeRankResponse) {
        console.log(`result.isSuccess: ${result.isSuccess}`);
        console.log(`member: ${result.rankInfo.myRank.member}, rank: ${result.rankInfo.myRank.rank}, 
                        score: ${result.rankInfo.myRank.score}, name: ${result.rankInfo.myRank.name}`);

        this.bestScore = result.rankInfo.myRank.score;
        console.log(`bestScore: ${this.bestScore}`);
    }

    OnResult(result: GetRangeRankResponse) {
        console.log(`result.isSuccess: ${result.isSuccess}`);
        if (result.rankInfo.myRank) {
            console.log(`member: ${result.rankInfo.myRank.member}, rank: ${result.rankInfo.myRank.rank}, 
                        score: ${result.rankInfo.myRank.score}, name: ${result.rankInfo.myRank.name}`);

            if (this.myrank_list != null) {
                let myComponent = this.myrank_list.GetComponent<RankData>();
                if (myComponent != null) {
                    // Do something with myComponent
                    console.log("Clear");
                }
                else {
                    console.error("MyComponent is not attached to myObject!");
                }
            }
            else {
                console.error("myObject is null or undefined!");
            }
        }

        if (result.rankInfo.rankList) {
            for (let i = 0; i < result.rankInfo.rankList.length; ++i) {
                const rank = result.rankInfo.rankList.get_Item(i);
                console.log(`i: ${i}, member: ${rank.member}, rank: ${rank.rank}, 
                            score: ${rank.score}, name: ${result.rankInfo.myRank.name}`);
            }
        }
    }

    OnError(error: string) {
        console.error(error);
    }

    GetRankData() {
        LeaderboardAPI.GetRangeRank(this.leaderboardId, this.startRank, this.endRank, this.resetRule, false,
            this.OnResult, this.OnError);
    }

    SetDataToUI(rankobj:GameObject, rrank: number, rname: string, rscore: number) {
        rankobj.GetComponent<RankData>().rank = rrank;
        rankobj.GetComponent<RankData>().userName = rname;
        rankobj.GetComponent<RankData>().score = rscore;
        rankobj.GetComponent<RankData>().SetInfoText();
    }
}