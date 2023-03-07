import { AudioClip, AudioSource, GameObject, Mathf, Object } from 'UnityEngine'
import { AudioMixer } from 'UnityEngine.Audio';
import { LoadSceneMode, Scene, SceneManager } from 'UnityEngine.SceneManagement';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class AudioManager extends ZepetoScriptBehaviour {

    public mixer: AudioMixer;
    public bgSound: AudioSource;
    public baseBg: AudioClip;
    public endBg: AudioClip;

    private static audio_Instance: AudioManager;

    public static get instance(): AudioManager {
        if (this.audio_Instance == null) {
            this.audio_Instance = new GameObject("AudioManager").AddComponent<AudioManager>();
        }
        return this.audio_Instance;
    }

    Awake() {
        if (AudioManager.audio_Instance == null) {
            AudioManager.audio_Instance = this;
            GameObject.DontDestroyOnLoad(AudioManager.audio_Instance);
            this.BgSoundPlay(this.baseBg);
        } else {
            GameObject.Destroy(AudioManager.audio_Instance);
        }
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
        this.bgSound.volume = 0.2;
        this.bgSound.Play();
    }

    public BgSoundReplay() {
        this.bgSound.Play();
    }

    public BgSoundPause() {
        this.bgSound.Pause();
    }

    public BgSoundStop() {
        this.bgSound.Stop();
    }

    public BGSoundVolume(val: number) {
        this.mixer.SetFloat("BGSoundVolume", Mathf.Log10(val) * 20);
    }
}