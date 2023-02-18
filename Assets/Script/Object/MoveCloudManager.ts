import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Vector3, GameObject, Object, Time, Random } from 'UnityEngine';

export default class MoveCloudManager extends ZepetoScriptBehaviour {

    public movingTime: number = 60;
    public moveSpeed: number = 0.5;
    public moveSpeedRandom: number = 0;
    private delta: number = 0;
    private directionCloud: bool = true;

    Start() {
        this.moveSpeedRandom = Random.Range(0.1, 1);
    }

    Update() {
        this.delta += Time.deltaTime;
        if (this.delta > this.movingTime) {
            this.delta = 0;
            this.directionCloud = !this.directionCloud;
        }

        var movevalue = Vector3.right * this.moveSpeed * this.moveSpeedRandom * Time.deltaTime;

        if (this.directionCloud) {
            // Move upward during the set moving time
            this.transform.Translate(movevalue);
        } else {
            // Move downward during the set moving time
            this.transform.Translate(-1 * movevalue);
        }
    }
}