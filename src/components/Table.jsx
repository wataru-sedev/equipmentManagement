import { useState } from "react"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  writeBatch,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

export const Table = ()=>{
    const firebaseConfig = {
        apiKey: "AIzaSyCEBcpn1WV35bnVf8-5z5jvXQu1Y47G3ho",
        authDomain: "inventorymanagement-f7db4.firebaseapp.com",
        projectId: "inventorymanagement-f7db4",
        storageBucket: "inventorymanagement-f7db4.firebasestorage.app",
        messagingSenderId: "858516922988",
        appId: "1:858516922988:web:6a143e7608ca225700ee49",
        measurementId: "G-046FERBD46",
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const [equipments, setEquipments] = useState([
        {name:"TOILET_PAPER", japaneseName:"トイレットペーパー", num:"2袋",quantity:"",},
        {name:"CHOPSTICKS", japaneseName:"箸", num:"2袋",quantity:"",},
        {name:"CHOPSTICKS_BAG", japaneseName:"箸袋", num:"10袋",quantity:"",},
        {name:"STRAW", japaneseName:"ストロー", num:"1箱",quantity:"",},
        {name:"BLACK_BAG", japaneseName:"汚物袋(黒)", num:"1箱",quantity:"",},
        {name:"ALCOHOL_PAPER", japaneseName:"アルコールペーパー", num:"8袋",quantity:"",},
        {name:"TUMAYOUZI", japaneseName:"つまようじ", num:"1箱",quantity:"",},
        {name:"ITTOCO", japaneseName:"イットコ", num:"10個",quantity:"",},
        {name:"CHILDREN_CHOPSTICKS", japaneseName:"子割りばし", num:"1袋",quantity:"",},
        {name:"TOILET_QUICKLE", japaneseName:"トイレクイックル", num:"5袋",quantity:"",},
    ]);

    const initializeInventory = async () => {
        const inventoryRef = collection(db, "equipment");
        
        for (const item of equipments) {
            const docRef = doc(inventoryRef, item.name); 

            try {
            await setDoc(docRef, { quantity: item.quantity }); 
            console.log(`${item.name} の在庫を Firestore に登録しました`);
            } catch (error) {
            console.error(`エラー: ${item.name} の登録に失敗`, error);
            }
        }
    }
    

    const onChangequantityValue =(index, value)=>{
        equipments[index].quantity = parseInt(value); 
        const newEquipments = [...equipments];
        setEquipments(newEquipments);
    }

    const onClickQuantityComplete = async () => {
        const hasEmptyField = equipments.some((item) => {
            if (item.quantity === "") {
              alert("入力されていない項目があります。");
              return true;
            }
            return false;
          });
        if (hasEmptyField) return;
        try {
            const batch = writeBatch(db);
            equipments.forEach((item) => {
              const docRef = doc(db, "equipment", item.name);
              batch.update(docRef, { quantity: item.quantity });
            });
            await batch.commit();
        
            alert("在庫データを更新しました");
          } catch (error) {
            console.error("更新エラー:", error);
          }
    };
    
    return(
        <>
            <table>
                <thead>
                <tr>
                    <th>備品</th>
                    <th>定数</th>
                    <th>数</th>
                </tr>
                </thead>
                <tbody>
                {equipments.map((item, index)=>{
                    const {japaneseName, num,quantity} = item;
                    return(
                        <tr key={japaneseName}>
                            <td>{japaneseName}</td>
                            <td>{num}</td>
                            <td><input type="number" value={quantity}  onChange={(e) => onChangequantityValue(index, e.target.value)}/></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div>
                <button onClick={ onClickQuantityComplete }>入力完了</button>
                <a className="styled-link" target="_blank" rel="noopener noreferrer" href="https://script.google.com/macros/s/AKfycbxcyvAO7DoQjxn7HJ8GkWCwDemZpvQ-R3ZXHKp3faek3axEXstG3S3Pfy65L9BIHUXy/exec">店長に送信</a>
            </div>
        </>
    )
}