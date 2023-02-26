import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Object, Collider, Collision, Debug, GameObject, LayerMask, ParticleSystem } from 'UnityEngine';
import { Text } from 'UnityEngine.UI';
import { Particle } from 'UnityEngine.ParticleSystem';
import MainData from '../Data/MainData';

export default class Heart_control extends ZepetoScriptBehaviour {

    public CloudCntData: GameObject;
    public player_layer: number;
    public cloud_effect: GameObject;
    public cloud_anim: GameObject;
    public cloud_off: number = 0;

    OnTriggerEnter(coll: Collider) {
        if (coll.gameObject.layer == this.player_layer) {
            this.gameObject.SetActive(false);
            this.cloud_off = 1;
            this.CloudCntData.GetComponent<MainData>().CloudCnt += 1;
            this.CloudCntData.GetComponent<MainData>().CurrentScore += 10;
            this.CloudCntData.GetComponent<MainData>().SetData();
            this.CloudCntData.GetComponent<MainData>().Save();
            this.cloud_effect.SetActive(true);
            // Object.Destroy(this.gameObject, 5);
        }
    }
}