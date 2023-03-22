import { Color, ExecuteInEditMode, Mathf } from 'UnityEngine';
import { Image } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class ProgressBar_control extends ZepetoScriptBehaviour {

    public minimum: number;
    public maximum: number;
    public current: number;
    public mask: Image;
    public fill: Image;
    public color: Color;

    Update() {
        this.GetCurrentFill();
    }

    GetCurrentFill() {
        let currentOffset = this.current - this.minimum;
        let maximumOffset = this.maximum - this.minimum;
        let fillAmount = currentOffset / maximumOffset;
        this.mask.fillAmount = fillAmount;
        this.fill.color = this.color;
    }
}