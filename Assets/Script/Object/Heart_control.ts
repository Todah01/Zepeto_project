import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Object, Collider, Collision, Debug, GameObject, LayerMask, ParticleSystem, AudioClip, Resources } from 'UnityEngine';
import { Text } from 'UnityEngine.UI';
import { Particle } from 'UnityEngine.ParticleSystem';
import MainData from '../Data/MainData';
import AudioManager from '../Character/AudioManager';

export default class Heart_control extends ZepetoScriptBehaviour {

    public CloudCntData: GameObject;
    public player_layer: number;
    public cloud_effect: GameObject;
    public cloud_anim: GameObject;
    public cloud_off: number = 0;

    private getCoinClip: AudioClip;

    Start() {
        this.getCoinClip = Resources.Load<AudioClip>("Audio/SFX/CoinBlue");
        console.log(this.getCoinClip.name);
    }

    OnTriggerEnter(coll: Collider) {
        if (coll.gameObject.layer == this.player_layer) {
            AudioManager.instance.SFXPlay("GetCoin", this.getCoinClip);
            this.cloud_effect.SetActive(true);
            this.gameObject.SetActive(false);
            this.cloud_off = 1;
            this.CloudCntData.GetComponent<MainData>().CloudCnt += 1;
            // this.CloudCntData.GetComponent<MainData>().CurrentScore += 10;
            this.CloudCntData.GetComponent<MainData>().SetData();
            this.CloudCntData.GetComponent<MainData>().Save();
            this.CloudCntData.GetComponent<MainData>().CheckGameEnd();
            // Object.Destroy(this.gameObject, 5);
        }
    }
}