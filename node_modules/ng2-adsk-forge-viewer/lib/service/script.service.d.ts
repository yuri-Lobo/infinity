export interface ScriptInfoLookup {
    [key: string]: ScriptInfo;
}
export interface ScriptInfo {
    src: string;
    loaded: boolean;
    status?: string;
}
export declare class ScriptService {
    private scripts;
    constructor();
    load(...urls: string[]): Promise<ScriptInfo[]>;
    loadScript(name: string): Promise<ScriptInfo>;
}
