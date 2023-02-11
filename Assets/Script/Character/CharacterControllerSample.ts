import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SpawnInfo, ZepetoPlayer, ZepetoPlayers } from "ZEPETO.Character.Controller";

export default class CharacterControllerSample extends ZepetoScriptBehaviour {

    Start() {
        ZepetoPlayers.instance.CreatePlayerWithZepetoId("todah01", "todah01", new SpawnInfo(), true);
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            let _plater = ZepetoPlayers.instance.LocalPlayer;
        })
    }

}