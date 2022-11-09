interface Drinker {
    id: string;
    totalCapacity: number;
    currentDrink: number;
    drinkerName: string;
    detail: string;
    // date로 수정할건지...
    lastDrinkTimeStamp: string;
}

export default Drinker;
