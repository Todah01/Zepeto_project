import { AudioClip, AudioSource, GameObject, Mathf, Object } from 'UnityEngine'
import { AudioMixer } from 'UnityEngine.Audio';
import { LoadSceneMode, Scene, SceneManager } from 'UnityEngine.SceneManagement';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class AudioManager extends ZepetoScriptBehaviour {

    public mixer: AudioMixer;
    @SerializeField() public bgSound: AudioSource;
    public baseBg: AudioClip;
    public endBg: AudioClip;

    private static Instance: AudioManager;

    Awake() {
        this.BgSoundPlay(this.baseBg);
        console.log("bgm : " + this.baseBg.name);
    }

    public static GetInstance(): AudioManager {
        if (!AudioManager.Instance) {
            var _obj = new GameObject("CustomSingleton");
            GameObject.DontDestroyOnLoad(_obj);
            AudioManager.Instance = _obj.AddComponent<AudioManager>();
        }
        return AudioManager.Instance;
    }

    private OnSceneLoaded(arg0: Scene, arg1: LoadSceneMode) {
        this.BgSoundPlay(this.baseBg);
        //for (let idx = 0; idx < this.bglist.length; idx++) {
        //    if (arg0.name == this.bglist[idx].name) {
        //        this.BgSoundPlay(this.bglist[idx]);
        //    }
        //}
    }

    public SFXPlay(sfxName: string, clip: AudioClip) {
        let go = new GameObject(sfxName + "Sound");
        let audioSource = go.AddComponent<AudioSource>();
        // audioSource.outputAudioMixerGroup = this.mixer.FindMatchingGroups("SFX")[0];
        audioSource.clip = clip;
        audioSource.volume = 0.3;
        audioSource.Play();

        Object.Destroy(go, clip.length);
    }

    public BgSoundPlay(clip: AudioClip) {
        // this.bgSound.outputAudioMixerGroup = this.mixer.FindMatchingGroups("BGSound")[0];
        this.bgSound.clip = clip;
        this.bgSound.loop = true;
        this.bgSound.volume = 0.3;
        this.bgSound.Play();
    }

    public BgSoundStop() {
        this.bgSound.Stop();
    }

    public BGSoundVolume(val: number) {
        this.mixer.SetFloat("BGSoundVolume", Mathf.Log10(val) * 20);
    }
}