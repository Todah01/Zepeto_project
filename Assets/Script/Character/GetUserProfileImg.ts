import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { ZepetoWorldHelper } from 'ZEPETO.World';
import { Texture, Texture2D, Sprite, Rect, Vector2 } from 'UnityEngine';
import { Image } from 'UnityEngine.UI';

export default class GetUserProfileImg extends ZepetoScriptBehaviour {

    public userId: string;

    private sampleImage: Image;

    Start() {
        this.sampleImage = this.GetComponent<Image>();
        ZepetoWorldHelper.GetProfileTexture(this.userId, (texture: Texture) => {
            this.sampleImage.sprite = this.GetSprite(texture);

        }, (error) => {
            console.log(error);
        });
    }

    GetSprite(texture: Texture) {
        let rect: Rect = new Rect(0, 0, texture.width, texture.height);
        return Sprite.Create(texture as Texture2D, rect, new Vector2(0.5, 0.5));
    }
}