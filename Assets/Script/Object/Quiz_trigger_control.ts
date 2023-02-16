import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Collider, Collision, Debug, GameObject, LayerMask } from 'UnityEngine';
import { UnityEvent } from 'UnityEngine.Events';

export default class Quiz_trigger_control extends ZepetoScriptBehaviour {

    public player_layer: int;
    public player_out: UnityEvent;
    public player_in: UnityEvent;

    OnTriggerEnter(coll: Collider) {
        if (coll.gameObject.layer == this.player_layer) {
            console.log("Player In");
            this.player_in.Invoke();
        }
    }

    OnTriggerExit(coll: Collider) {
        console.log("Player Out");
        this.player_out.Invoke();
    }
}