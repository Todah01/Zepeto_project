import { AudioClip } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import AudioManager from './AudioManager';

export default class JumpSoundControl extends ZepetoScriptBehaviour {

    public JumpSoundClip: AudioClip;

    public JumpSoundControl() {
        AudioManager.instance.SFXPlay("jump", this.JumpSoundClip);
    }
}