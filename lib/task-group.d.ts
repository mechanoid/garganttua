import { Toggle } from './toggle';
export declare class TaskGroup extends HTMLLIElement {
    groupGrid: HTMLElement | null | undefined;
    subList: HTMLElement | null | undefined;
    nestedTaskGroups: HTMLElement[] | undefined;
    groupChildrenToggle: Toggle | undefined;
    connectedCallback(): void;
    attachToggles(): void;
    resetCollapsedState(): void;
}
