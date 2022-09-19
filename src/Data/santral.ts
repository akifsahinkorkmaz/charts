interface pos {
    city: string,
    x: string,
    y: string,
}

export interface santral {
    name: string,
    owner: string,
    power: number,
    unit: string,
    position: pos
}

export interface Isantral_meta {
    maxPower: number,
}

let santrals: santral[] = [
    {
        name: "Karapınar YEKA-1",
        owner: "Kalyon Holding Enerji Grubu",
        power: 756.05,
        unit: "MWe",
        position: {
            city: "Konya, Karapınar",
            x: "37.711281", 
            y: "33.543432"
        }
    },
    {
        name: "Naturel & Esenboğa Enerji",
        owner: "Naturel Yenilenebilir Enerji",
        power: 118.03,
        unit: "MWe",
        position: {
            city: "Ankara", 
            x: "39.898478", 
            y: "32.811723"
        }
    },
    {
        name: "Kayseri OSB",
        owner: "Kayseri OSB",
        power: 50,
        unit: "MWe",
        position: {
            city: "Kayseri, Melikgazi", 
            x: "38.726508", 
            y: "35.374826"
        }
    },
]

var maxPower = 0;
for (let st of santrals){
    maxPower = st.power > maxPower ? st.power : maxPower; 
}
export let santral_meta: Isantral_meta = {
    maxPower: maxPower,
}

export default santrals;