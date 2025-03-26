import { useState } from "react"

export const Table = ()=>{

    const [equipments, setEquipments] = useState([
        {name:"トイレットペーパー",num:2,input:"",},
        {name:"箸",num:5,input:"",},
        {name:"ストロー",num:1,input:"",},
    ]);

    const onChangeInputValue =(index, value)=>{
        equipments[index].input = parseInt(value); 
        const newEquipments = [...equipments];
        setEquipments(newEquipments);
    }
    
    return(
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
                const {name, num,input} = item;
                return(
                    <tr key={name}>
                        <td>{name}</td>
                        <td>{num}</td>
                        <td><input type="number" value={input}  onChange={(e) => onChangeInputValue(index, e.target.value)}/></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}