import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Collider, Collider2D, Collision, Collision2D, Debug } from 'UnityEngine';

export default class Gem_control extends ZepetoScriptBehaviour {

    OnCollisionEnter(coll: Collision) {
        Debug.Log(`OnCollisionEnter ${coll.gameObject.name}.`);
    }
}