import {Collider, Vector3, Quaternion, Object, GameObject, Mathf, Sprite} from 'UnityEngine';
import {CharacterState, SpawnInfo, ZepetoCharacter, ZepetoPlayers, ZepetoPlayer} from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import {Room} from "ZEPETO.Multiplay";
import {ZepetoWorldMultiplay} from "ZEPETO.World";
import PlayerSync from '../Player/PlayerSync';
import MainData from '../../../Script/Data/MainData';
import GameManager from '../../../Script/Character/GameManager';
import { Image } from 'UnityEngine.UI';

export default class FallChecking extends ZepetoScriptBehaviour {

    public MainData: GameObject;
    public GameManager: GameObject;
    public spawnPosition: Vector3;
    public endPosition: Vector3;
    public playerLayer: number;

    public ResetPosition(position: Vector3) {
        const localCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        localCharacter.Teleport(position, Quaternion.identity);
    }

    private OnTriggerEnter(coll: Collider) {
        //if(!coll.transform.GetComponent<PlayerSync>()?.isLocal){
        //    return;
        //}

        if (coll.gameObject.layer != this.playerLayer) {
            return;
        }

        this.ResetPosition(this.spawnPosition);

        this.GameManager.GetComponent<GameManager>().LifeChecking("LifeCheck");

        if (!this.GameManager.GetComponent<GameManager>().CurrentLifeCnt) {
            this.GameManager.GetComponent<GameManager>().gameOff();
            this.MainData.GetComponent<MainData>().SetScoreToLeaderboard();
            this.GameManager.GetComponent<GameManager>().gameoverField.SetActive(true);
            this.ResetPosition(this.endPosition);
        }
    }
}