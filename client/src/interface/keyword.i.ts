export interface IKeyword{
    ID: number;
    text: string;
    topic: {
        ID: number;
        name: string;
    };
}