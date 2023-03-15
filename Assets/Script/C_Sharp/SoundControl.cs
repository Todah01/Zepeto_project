using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SoundControl : MonoBehaviour
{
    public AudioClip JumpSoundClip;
    public AudioClip RunningClip;

    private GameObject tempObject;

    public void JumpSoundPlay()
    {
        SFXControl(JumpSoundClip.name, JumpSoundClip);
    }
    public void RunningSoundPlay()
    {
        SFXControl(RunningClip.name, RunningClip);
    }
    public void SoundStop()
    {
        Destroy(tempObject);
    }

    public void SFXControl(string sfxName, AudioClip clip)
    {
        GameObject go = new GameObject(sfxName + "Sound");
        tempObject = go;
        AudioSource audioSource = tempObject.AddComponent<AudioSource>();
        // audioSource.outputAudioMixerGroup = this.mixer.FindMatchingGroups("SFX")[0];
        audioSource.clip = clip;
        audioSource.volume = 1f;
        if (clip.name == "RunningClip")
            audioSource.loop = true;
        audioSource.Play();
    }


}
