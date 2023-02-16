import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Collider, Collision, Debug, GameObject, LayerMask } from 'UnityEngine';
import { Text } from 'UnityEngine.UI';

export default class Heart_control extends ZepetoScriptBehaviour {

    public player_layer: int;
    public gem_cnt_txt: Text;
    private gem_cnt: int = 0;

    OnTriggerEnter(coll: Collider) {
        if (coll.gameObject.layer == this.player_layer) {
            console.log(`OnTriggerEnter ${coll.gameObject.name}.`);
            this.gem_cnt += 1;
            this.gem_cnt_txt.text = this.gem_cnt.toString();
        }
    }
}