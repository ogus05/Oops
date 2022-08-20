export class PostBoxDto{
    password: string;
    backgroundColor: string;
    oops: OopDto[];
}

export class PatchBoxDto{
    token: string;
    password: string;
    backgroundColor: string;
    oops: OopDto[];
}

class OopDto{
    left: number;
    top: number;
    keywordID: number;
    text: string;
    font: number;
    fontColor: string;
    fontSize: number;
    color: string;
    size: number;
    borderColor: string;
}