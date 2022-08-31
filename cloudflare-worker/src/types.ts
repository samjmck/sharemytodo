export type ShareListParams = {
    uuid: string;
    writable: boolean;
};
export type Item = {
    id: number;
    content: string;
    checked: boolean;
};
export type List = {
    title: string;
    items: Item[]
};
export type PrivateParams = {
    uuid: string;
};
export type SharedParams = {
    uuid: string;
    writable: boolean;
    mac: string;
};

export function isShared(data: any): data is SharedParams {
    return data.uuid !== undefined &&
        data.writable !== undefined &&
        data.mac !== undefined;
}
