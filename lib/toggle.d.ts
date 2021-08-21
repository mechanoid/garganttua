export declare class Toggle extends HTMLButtonElement {
    activeLabel: string;
    inactiveLabel: string;
    constructor();
    get active(): string;
    set active(label: string);
    get inactive(): string;
    set inactive(label: string);
    activate(): void;
    deactivate(): void;
    static build(activeLabel: string, inactiveLabel: string): Toggle;
}
