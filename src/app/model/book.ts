/**
 * book
 */

export interface IBook {
    id: string;
    volumeInfo: {
        title: string;
        subtitle: string;
        authors: string[];
        previewLink: string;
        infoLink: string;
        publisher: string;
        publishDate: string;
        description: string;
        averageRating: number;
        ratingsCount: number;
        imageLinks: {
            thumbnail: string;
            smallThumbnail: string;
        };
        industryIdentifiers: Array<{type: string, identifier: string}>,
        language: string;
    };
}
