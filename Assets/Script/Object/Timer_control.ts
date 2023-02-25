import { Mathf, Time } from 'UnityEngine';
import { Text } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Timer_control extends ZepetoScriptBehaviour {

    public timeValue: number;
    public timeText: Text;
    public timerOn: boolean = true;

    Update() {
        if (this.timerOn) {
            if (this.timeValue > 0)
                this.timeValue -= Time.deltaTime;
            else
                this.timeValue = 0;

            this.DisplayTime(this.timeValue);
        }
    }

    public ResetSetting() {
        this.timeValue = 1800;
        this.timerOn = true;
    }

    private DisplayTime(timeToDisplay: number) {
        if (timeToDisplay < 0)
            timeToDisplay = 0;

        let minutes = Mathf.FloorToInt(timeToDisplay / 60);
        let seconds = Mathf.FloorToInt(timeToDisplay % 60);

        this.timeText.text = minutes.toString() + ':' + seconds.toString();
    }
}