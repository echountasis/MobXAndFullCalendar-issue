import { createContext } from "react";
import { configure } from "mobx";
import { VehicleStore } from "./vehicleStore";

configure({ enforceActions: "always" });

export class RootStore {
    vehicleStore: VehicleStore;

    constructor() {
        this.vehicleStore = new VehicleStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());
