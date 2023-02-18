import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Vector3, GameObject, Object, Time, Random, Collider } from 'UnityEngine';

export default class MoveDownCloud_control extends ZepetoScriptBehaviour {

    public moveSpeed: number = 0.5;
    public checkBoard: GameObject;
    public upperBoard: GameObject;
    public downBoard: GameObject;

    Update() {
        this.transform.position = Vector3.Lerp(this.transform.position, this.checkBoard.transform.position, Time.deltaTime * this.moveSpeed);
    }

    OnTriggerEnter(coll: Collider) {
        console.log(`OnTriggerEnter ${coll.gameObject.name}.`);

        if (coll.gameObject.CompareTag("upper_board")) {
            this.checkBoard = this.downBoard;
        }

        if (coll.gameObject.CompareTag("down_board")) {
            this.checkBoard = this.upperBoard;
        }
    }
}