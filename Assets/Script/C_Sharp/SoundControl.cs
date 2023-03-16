using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SoundControl : MonoBehaviour
{
    public AudioClip JumpSoundClip;
    public AudioClip RunningClip;

    private GameObject tempObject;
    private bool isRun = false;

    public void JumpSoundPlay()
    {
        SFXControl(JumpSoundClip.name, JumpSoundClip);
    }
    public void RunningSoundPlay()
    {
        if (isRun) return;

        isRun = true;
        SFXControl(RunningClip.name, RunningClip);
    }
    public void SoundStop()
    {
        Destroy(tempObject);
        isRun = false;
    }

    public void SFXControl(string sfxName, AudioClip clip)
    {
        GameObject go = new GameObject(sfxName + "Sound");
        tempObject = go;
        AudioSource audioSource = tempObject.AddComponent<AudioSource>();
        // audioSource.outputAudioMixerGroup = this.mixer.FindMatchingGroups("SFX")[0];
        audioSource.clip = clip;
        audioSource.volume = 1f;
        if (clip.name == "running")
            audioSource.loop = true;
        audioSource.Play();

        if (clip.name == "jumping")
            Destroy(tempObject, clip.length);
    }


}
