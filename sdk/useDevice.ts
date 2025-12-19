import { signal } from "@preact/signals";
import { Device } from "@deco/deco/utils";
const deviceSignal = signal(<Device>"desktop");
const state = {
    deviceSignal,
};
export const useDevice = () => state;
