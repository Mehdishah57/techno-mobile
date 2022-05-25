const getIconName = (category) => {
    if(category === "All Categories")
        return {iconName: "border-all", color: 'rgb(113, 174, 255)'}
    if(category === "Electronic Systems")
        return  {iconName: "desktop",color: "rgb(255, 241, 132)"}
    if(category === "Mobiles")
        return {iconName: "mobile-alt",color: "rgb(255, 101, 101)"}
    if(category === "Bikes")
        return {iconName: "motorcycle",color: "rgb(58, 196, 120)"}
    if(category === "Vehicles")
        return {iconName: "car-side",color: "tomato"}
    if(category === "Animals")
        return {iconName: "dog", color:'pink'}
    return {iconName: "shopping-cart",color: "rgb(180, 106, 50)"}
}

export default getIconName;