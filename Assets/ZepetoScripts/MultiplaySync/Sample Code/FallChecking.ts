import {Collider, Vector3, Quaternion, Object, GameObject, Mathf} from 'UnityEngine';
import {CharacterState, SpawnInfo, ZepetoCharacter, ZepetoPlayers, ZepetoPlayer} from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import {Room} from "ZEPETO.Multiplay";
import {ZepetoWorldMultiplay} from "ZEPETO.World";
import PlayerSync from '../Player/PlayerSync';
import { List$1 } from 'System.Collections.Generic';
import { forEachChild } from 'typescript';

export default class FallChecking extends ZepetoScriptBehaviour {

    @SerializeField() private lifeBox: GameObject[] = [];
    //It's a script that responds when the Zepeto character falls.
    public spawnPositon: Vector3;
    public life_cnt: int;

    Start() {
        this.life_cnt = this.lifeBox.length;
    }

    private OnTriggerEnter(coll: Collider) {
        if(!coll.transform.GetComponent<PlayerSync>()?.isLocal){
            return;
        }

        const localCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        localCharacter.Teleport(this.spawnPositon,Quaternion.identity);

        console.log("life count : " + this.life_cnt);
        this.life_cnt = Mathf.Max(0, this.life_cnt - 1);

        for (let idx = this.lifeBox.length; idx > this.life_cnt; idx--)
            this.lifeBox[idx - 1].SetActive(false);

        if (!this.life_cnt) {

        }
    }
}