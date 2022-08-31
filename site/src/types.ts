export type Item = {
    content: string;
    checked: boolean;
};
export type LinkedItem = {
    item: Item;
    previousLinkedItem: LinkedItem | undefined;
    nextLinkedItem: LinkedItem | undefined;
}
export type List = {
    title: string;
    items: Item[]
};
export type PersonalParams = {
    uuid: string;
};
export type SharedParams = {
    uuid: string;
    writable: boolean;
    mac: string;
};
export type SharedList = SharedParams & { list: List };
export type PersonalList = PersonalParams & { list: List };
export type PersonalOrSharedList = (PersonalParams | SharedParams) & { list: List };

export function isShared(data: any): data is SharedParams {
    return data.uuid !== undefined &&
        data.writable !== undefined &&
        data.mac !== undefined;
}
