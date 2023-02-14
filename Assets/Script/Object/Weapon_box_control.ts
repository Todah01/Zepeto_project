import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Collider, Collision, Debug, GameObject, LayerMask } from 'UnityEngine';

export default class Weapon_box_control extends ZepetoScriptBehaviour {

    public player_layer: int;
    public rainforce_table: GameObject;

    OnTriggerEnter(coll: Collider) {
        if (coll.gameObject.layer == this.player_layer) {
            this.rainforce_table.SetActive(true);
        }
    }
    OnTriggerExit(coll: Collider) {
        console.log(`OnTriggerExit ${coll.gameObject.name}.`);
        this.rainforce_table.SetActive(false);
    }
}