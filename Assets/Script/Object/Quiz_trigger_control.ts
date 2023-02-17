import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Collider, Collision, Debug, GameObject, LayerMask } from 'UnityEngine';
import { UnityEvent } from 'UnityEngine.Events';
import QuizManager from './QuizManager';

export default class Quiz_trigger_control extends ZepetoScriptBehaviour {

    public QuizManager: GameObject;
    public player_layer: int;

    private quiz_manager: QuizManager;

    Start() {
        this.quiz_manager = this.QuizManager.GetComponent<QuizManager>();
    }

    OnTriggerEnter(coll: Collider) {
        if (coll.gameObject.layer == this.player_layer) {
            console.log("Player In");
            this.quiz_manager.quiz_start();
        }
    }

    OnTriggerExit(coll: Collider) {
        console.log("Player Out");
        this.quiz_manager.quiz_end();
    }
}