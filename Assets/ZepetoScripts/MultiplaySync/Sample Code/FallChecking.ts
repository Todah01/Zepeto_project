import {Collider, Vector3, Quaternion, Object, GameObject, Mathf} from 'UnityEngine';
import {CharacterState, SpawnInfo, ZepetoCharacter, ZepetoPlayers, ZepetoPlayer} from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import {Room} from "ZEPETO.Multiplay";
import {ZepetoWorldMultiplay} from "ZEPETO.World";
import PlayerSync from '../Player/PlayerSync';
import MainData from '../../../Script/Data/MainData';
import GameManager from '../../../Script/Character/GameManager';

export default class FallChecking extends ZepetoScriptBehaviour {

    @SerializeField() private lifeBox: GameObject[] = [];
    public MainData: GameObject;
    public GameManager: GameObject;
    public spawnPosition: Vector3;
    public endPosition: Vector3;
    public life_cnt: number;

    Start() {
        this.ResetSetting();
    }

    private ResetSetting() {
        this.life_cnt = this.lifeBox.length;
        for (let idx = 0; idx < this.lifeBox.length; idx++)
            this.lifeBox[idx].SetActive(true);
    }

    public ResetPosition(position: Vector3) {
        const localCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        localCharacter.Teleport(position, Quaternion.identity);
    }

    private OnTriggerEnter(coll: Collider) {
        if(!coll.transform.GetComponent<PlayerSync>()?.isLocal){
            return;
        }

        this.ResetPosition(this.spawnPosition);

        // console.log("life count : " + this.life_cnt);
        this.life_cnt = Mathf.Max(0, this.life_cnt - 1);

        for (let idx = this.lifeBox.length; idx > this.life_cnt; idx--)
            this.lifeBox[idx - 1].SetActive(false);

        if (!this.life_cnt) {
            this.GameManager.GetComponent<GameManager>().gameOff();
            this.MainData.GetComponent<MainData>().SetScoreToLeaderboard();
            this.ResetSetting();
            this.GameManager.GetComponent<GameManager>().gameoverField.SetActive(true);
            this.ResetPosition(this.endPosition);
        }
    }
}