import { ZepetoScriptBehaviour, ZepetoScriptableObject } from 'ZEPETO.Script'

export default class Cal_weapon_control extends ZepetoScriptBehaviour {

    public Spear: ZepetoScriptableObject;
    public Staff: ZepetoScriptableObject;
    public Bow: ZepetoScriptableObject;

    Awake() {
        // Direct access by name
        console.log(`name : ${this.Spear["name"]}`);
        console.log(`price : ${this.Spear["price"]}`);
        console.log(`name : ${this.Staff["name"]}`);
        console.log(`price : ${this.Staff["price"]}`);
        console.log(`name : ${this.Bow["name"]}`);
        console.log(`price : ${this.Bow["price"]}`);
    }
}