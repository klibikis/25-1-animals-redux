import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Animal = {
    animal: string;
    image: string
};

type Animals = {
    animals: Animal[];
};

let animalsFromLocalStorage = [];
if (localStorage.animals) {
    animalsFromLocalStorage = JSON.parse(localStorage.animals);
} else {
    animalsFromLocalStorage = [];
    localStorage.setItem("animals", JSON.stringify([]));
}

const initialState: Animals = {
    animals: animalsFromLocalStorage,
};

const animalSlice = createSlice({
    name: "animals",
    initialState,
    reducers: {
        addAnimal: (state, action: PayloadAction<Animal>) => {
            state.animals = [...state.animals, action.payload];
        },
        deleteAnimal: (state, action: PayloadAction<string>) => {
            state.animals = state.animals.filter(
                (animal) => animal.animal !== action.payload
            );
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        saveAnimalsInLocalStorage: (state) => {
            localStorage.setItem("animals", JSON.stringify(state.animals));
        },
        sortAnimals: (state) => {
            function compare(a: Animal, b: Animal) {
                if (a.animal < b.animal) {
                    return -1;
                }
                if (a.animal > b.animal) {
                    return 1;
                }
                return 0;
            }
            state.animals.sort(compare);
        },
    },
});

export const { addAnimal, deleteAnimal, saveAnimalsInLocalStorage, sortAnimals } =
    animalSlice.actions;

export default animalSlice.reducer;
