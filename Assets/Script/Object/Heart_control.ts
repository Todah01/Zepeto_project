import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Object, Collider, Collision, Debug, GameObject, LayerMask, ParticleSystem } from 'UnityEngine';
import { Text } from 'UnityEngine.UI';
import { Particle } from 'UnityEngine.ParticleSystem';

export default class Heart_control extends ZepetoScriptBehaviour {

    public player_layer: int;
    public cloud_effect: GameObject;
    public cloud_anim: GameObject;
    public cloud_cnt_txt: Text;
    public cloud_cnt: int = 0;

    private particlesystem: ParticleSystem;

    OnTriggerEnter(coll: Collider) {
        if (coll.gameObject.layer == this.player_layer) {
            this.gameObject.SetActive(false);
            this.cloud_cnt += 1;
            this.cloud_cnt_txt.text = this.cloud_cnt.toString();
            this.cloud_effect.SetActive(true);
            Object.Destroy(this.gameObject, 5);
        }
    }
}