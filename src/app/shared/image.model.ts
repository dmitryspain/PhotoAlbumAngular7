import { Like } from "./like.model";

export class Image {
    Id: number;
    ImageName: string;
    Description: string;
    Data: string;
    // Likes: string[];
    Likes: Like[];
    UploadedDate: Date;
}
