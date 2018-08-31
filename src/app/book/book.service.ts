/**
 * book.service
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IBook } from '../model';
import { BookModule } from './book.module';

@Injectable({
    providedIn: BookModule
})
export class GoogleBookService {

    private readonly GOOGLE_API_PATH = 'https://www.googleapis.com/books/v1/volumes';

    private readonly GOOGLE_API_KEY = 'AIzaSyAkzvrk5-MOUYzYLNjCguXd6MrZ7CplQn0';

    private readonly NY_API_PATH = 'https://content.api.nytimes.com/svc/books/v3/lists.json';

    private readonly NY_API_KEY = 'b02a669476d2423fb3514ae47d013c99';

    private readonly maxResults = 15; // The maximum number of results to return

    private testObj = [
        {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "gHgttAEACAAJ",
                    "etag": "SquU9npQ62k",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/gHgttAEACAAJ",
                    "volumeInfo": {
                        "title": "The President Is Missing",
                        "subtitle": "A Novel",
                        "authors": [
                            "James Patterson",
                            "Bill Clinton"
                        ],
                        "publisher": "Little, Brown and Knopf",
                        "publishedDate": "2018-06-04",
                        "description": "President Bill Clinton and bestselling novelist James Patterson set out to write the best thriller ever about an American president--The President Is Missing. What President Clinton and Patterson have created is the most dramatic three days any President has ever faced. Maybe the most dramatic three days in American history. And it could all really happen. The President Is Missing is Bill Clinton and James Patterson's totally authentic and spellbinding thriller.",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_10",
                                "identifier": "0316412694"
                            },
                            {
                                "type": "ISBN_13",
                                "identifier": "9780316412698"
                            }
                        ],
                        "readingModes": {
                            "text": false,
                            "image": false
                        },
                        "pageCount": 528,
                        "printType": "BOOK",
                        "categories": [
                            "Fiction"
                        ],
                        "averageRating": 3.5,
                        "ratingsCount": 11,
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": false,
                        "contentVersion": "preview-1.0.0",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=gHgttAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=gHgttAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com.au/books?id=gHgttAEACAAJ&dq=isbn:0316412694&hl=&cd=1&source=gbs_api",
                        "infoLink": "http://books.google.com.au/books?id=gHgttAEACAAJ&dq=isbn:0316412694&hl=&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/The_President_Is_Missing.html?hl=&id=gHgttAEACAAJ"
                    },
                    "saleInfo": {
                        "country": "AU",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "AU",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": false
                        },
                        "pdf": {
                            "isAvailable": false
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=gHgttAEACAAJ&hl=&printsec=frontcover&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "&quot;This book moves like Air Force One. Big and fast. Clinton and Patterson are a dream combo."
                    }
                }
            ]
        },
        {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "nikRUi7nUj8C",
                    "etag": "ZLgaVZKbOkc",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/nikRUi7nUj8C",
                    "volumeInfo": {
                        "title": "Sharp Objects",
                        "subtitle": "A Novel",
                        "authors": [
                            "Gillian Flynn"
                        ],
                        "publisher": "Broadway Books",
                        "publishedDate": "2006-09-26",
                        "description": "SOON TO BE AN HBO LIMITED SERIES STARRING AMY ADAMS, AIRING JULY 8 FROM THE #1 NEW YORK TIMES BESTSELLING AUTHOR OF GONE GIRL Fresh from a brief stay at a psych hospital, reporter Camille Preaker faces a troubling assignment: she must return to her tiny hometown to cover the murders of two preteen girls. For years, Camille has hardly spoken to her neurotic, hypochondriac mother or to the half-sister she barely knows: a beautiful thirteen-year-old with an eerie grip on the town. Now, installed in her old bedroom in her family's Victorian mansion, Camille finds herself identifying with the young victims—a bit too strongly. Dogged by her own demons, she must unravel the psychological puzzle of her own past if she wants to get the story—and survive this homecoming.",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_10",
                                "identifier": "0307351483"
                            },
                            {
                                "type": "ISBN_13",
                                "identifier": "9780307351487"
                            }
                        ],
                        "readingModes": {
                            "text": true,
                            "image": false
                        },
                        "pageCount": 272,
                        "printType": "BOOK",
                        "categories": [
                            "Fiction"
                        ],
                        "averageRating": 3.5,
                        "ratingsCount": 264,
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": true,
                        "contentVersion": "0.14.12.0.preview.2",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=nikRUi7nUj8C&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=nikRUi7nUj8C&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com.au/books?id=nikRUi7nUj8C&dq=isbn:0307351483&hl=&cd=1&source=gbs_api",
                        "infoLink": "http://books.google.com.au/books?id=nikRUi7nUj8C&dq=isbn:0307351483&hl=&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/Sharp_Objects.html?hl=&id=nikRUi7nUj8C"
                    },
                    "saleInfo": {
                        "country": "AU",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "AU",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": true
                        },
                        "pdf": {
                            "isAvailable": true
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=nikRUi7nUj8C&hl=&printsec=frontcover&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "AN HBO® LIMITED SERIES STARRING AMY ADAMS FROM THE #1 NEW YORK TIMES BESTSELLING AUTHOR OF GONE GIRL Fresh from a brief stay at a psych hospital, reporter Camille Preaker faces a troubling assignment: she must return to her tiny hometown ..."
                    }
                }
            ]
        },
        {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "v_s5DwAAQBAJ",
                    "etag": "NDIIl1OH7n8",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/v_s5DwAAQBAJ",
                    "volumeInfo": {
                        "title": "The Good Fight",
                        "subtitle": "A Novel",
                        "authors": [
                            "Danielle Steel"
                        ],
                        "publisher": "Delacorte Press",
                        "publishedDate": "2018-07-10",
                        "description": "Against the electrifying backdrop of the 1960s, Danielle Steel unveils the gripping chronicle of a young woman discovering a passion for justice and of the unsung heroes she encounters on her quest to fight the good fight. The daughter and granddaughter of prominent Manhattan lawyers, Meredith McKenzie is destined for the best of everything: top schools, elite social circles, the perfect marriage. Spending her childhood in Germany as her father prosecutes Nazi war criminals at the Nuremberg trials, Meredith soaks up the conflict between good and evil as it plays out in real time. When her family returns to the United States, she begins blazing her own trail, swimming against the tides, spurred on by her freethinking liberal grandfather, determined to become a lawyer despite her traditional, conservative father’s objections. She rebels against her parents’ expectations for her debutante ball and other conventions. She forges a lifelong friendship with a young German Jewish woman whose family died in the concentration camps. And while her grandfather rises to the Supreme Court, Meredith enlists in the most pressing causes of her time, fighting for civil rights and an end to the Vietnam War. From the bright morning of JFK’s inauguration, through the tumultuous years that follow as America hurtles toward the twin assassinations of Martin Luther King Jr. and Bobby Kennedy, Meredith joins the vanguard of a new generation of women, breaking boundaries socially, politically, and professionally. But when the violence of the era strikes too close to home, her once tightly knit family must survive a devastating loss and rethink their own values and traditions in light of the times. Encompassing the remarkable people Meredith meets, the historic events she witnesses, and the sacrifices she must make, this is the story of a woman changing her world as she herself is changed by it. Beautifully told, brimming with unforgettable moments and characters, The Good Fight is an inspiring, uplifting novel with resonance for our own time.",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_13",
                                "identifier": "9781101884133"
                            },
                            {
                                "type": "ISBN_10",
                                "identifier": "1101884134"
                            }
                        ],
                        "readingModes": {
                            "text": true,
                            "image": false
                        },
                        "pageCount": 304,
                        "printType": "BOOK",
                        "categories": [
                            "Fiction"
                        ],
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": true,
                        "contentVersion": "1.2.2.0.preview.2",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=v_s5DwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=v_s5DwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com.au/books?id=v_s5DwAAQBAJ&dq=isbn:1101884134&hl=&cd=1&source=gbs_api",
                        "infoLink": "http://books.google.com.au/books?id=v_s5DwAAQBAJ&dq=isbn:1101884134&hl=&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/The_Good_Fight.html?hl=&id=v_s5DwAAQBAJ"
                    },
                    "saleInfo": {
                        "country": "AU",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "AU",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": true
                        },
                        "pdf": {
                            "isAvailable": true
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=v_s5DwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "Encompassing the remarkable people Meredith meets, the historic events she witnesses, and the sacrifices she must make, this is the story of a woman changing her world as she herself is changed by it."
                    }
                }
            ]
        },
        {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "hR44DwAAQBAJ",
                    "etag": "GNPNU51UnAY",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/hR44DwAAQBAJ",
                    "volumeInfo": {
                        "title": "The Perfect Couple",
                        "authors": [
                            "Elin Hilderbrand"
                        ],
                        "publisher": "Little, Brown",
                        "publishedDate": "2018-06-19",
                        "description": "From New York Times bestselling author Elin Hilderbrand, comes a novel about the many ways family can fill our lives with love...if they don't kill us first. It's Nantucket wedding season, also known as summer-the sight of a bride racing down Main Street is as common as the sun setting at Madaket Beach. The Otis-Winbury wedding promises to be an event to remember: the groom's wealthy parents have spared no expense to host a lavish ceremony at their oceanfront estate. But it's going to be memorable for all the wrong reasons after tragedy strikes: a body is discovered in Nantucket Harbor just hours before the ceremony-and everyone in the wedding party is suddenly a suspect. As Chief of Police Ed Kapenash interviews the bride, the groom, the groom's famous mystery-novelist mother, and even a member of his own family, he discovers that every wedding is a minefield-and no couple is perfect. Featuring beloved characters from The Castaways, Beautiful Day, and A Summer Affair, The Perfect Couple proves once again that Elin Hilderbrand is the queen of the summer beach read.",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_13",
                                "identifier": "9780316375245"
                            },
                            {
                                "type": "ISBN_10",
                                "identifier": "0316375241"
                            }
                        ],
                        "readingModes": {
                            "text": true,
                            "image": false
                        },
                        "pageCount": 480,
                        "printType": "BOOK",
                        "categories": [
                            "Fiction"
                        ],
                        "averageRating": 4,
                        "ratingsCount": 10,
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": true,
                        "contentVersion": "1.5.4.0.preview.2",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=hR44DwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=hR44DwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com.au/books?id=hR44DwAAQBAJ&dq=isbn:0316375241&hl=&cd=1&source=gbs_api",
                        "infoLink": "http://books.google.com.au/books?id=hR44DwAAQBAJ&dq=isbn:0316375241&hl=&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/The_Perfect_Couple.html?hl=&id=hR44DwAAQBAJ"
                    },
                    "saleInfo": {
                        "country": "AU",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "AU",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": true
                        },
                        "pdf": {
                            "isAvailable": true
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=hR44DwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "Featuring beloved characters from The Castaways, Beautiful Day, and A Summer Affair, The Perfect Couple proves once again that Elin Hilderbrand is the queen of the summer beach read."
                    }
                }
            ]
        },
        {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "V_A3DwAAQBAJ",
                    "etag": "bDSsLUjswG8",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/V_A3DwAAQBAJ",
                    "volumeInfo": {
                        "title": "All We Ever Wanted",
                        "subtitle": "A Novel",
                        "authors": [
                            "Emily Giffin"
                        ],
                        "publisher": "Ballantine Books",
                        "publishedDate": "2018-06-26",
                        "description": "In the riveting new novel from the #1 bestselling author of Something Borrowed and First Comes Love, three very different people must choose between their families and their most deeply held values. . . . “An unpredictable page-turner that unfolds in the voices of three superbly distinct characters.”—The Atlanta Journal-Constitution “A gripping, thought-provoking journey.”—Jodi Picoult Nina Browning is living the good life after marrying into Nashville’s elite. More recently, her husband made a fortune selling his tech business, and their adored son has been accepted to Princeton. Yet sometimes the middle-class small-town girl in Nina wonders if she’s strayed from the person she once was. Tom Volpe is a single dad working multiple jobs while struggling to raise his headstrong daughter, Lyla. His road has been lonely, long, and hard, but he finally starts to relax after Lyla earns a scholarship to Windsor Academy, Nashville’s most prestigious private school. Amid so much wealth and privilege, Lyla doesn’t always fit in—and her overprotective father doesn’t help—but in most ways, she’s a typical teenaged girl, happy and thriving. Then, one photograph, snapped in a drunken moment at a party, changes everything. As the image spreads like wildfire, the Windsor community is instantly polarized, buzzing with controversy and assigning blame. At the heart of the lies and scandal, Tom, Nina, and Lyla are forced together—all questioning their closest relationships, asking themselves who they really are, and searching for the courage to live a life of true meaning. Advance praise for All We Ever Wanted “Nina Browning has it all: the handsome husband, the Ivy-League-bound teenage son, and the big house in the Nashville suburbs. But with one unthinkable social media post from her beloved child, could it all fall apart? Dealing with issues of class, money, and race, All We Ever Wanted is the book everyone will be talking about.”—PopSugar “This complex and layered novel will give you all the feels.” —Brit + Co “This thought-provoking novel follows two Nashville families as they struggle with the fallout from a horrible incident. Their wealthy community quickly becomes divided, with people eager to assign blame and take sides as the families struggle with loyalty and staying true to their values. It's one of Giffin's most topical, gripping books yet.”—Good Housekeeping",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_13",
                                "identifier": "9780399178931"
                            },
                            {
                                "type": "ISBN_10",
                                "identifier": "0399178937"
                            }
                        ],
                        "readingModes": {
                            "text": true,
                            "image": false
                        },
                        "pageCount": 400,
                        "printType": "BOOK",
                        "categories": [
                            "Fiction"
                        ],
                        "averageRating": 4,
                        "ratingsCount": 12,
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": true,
                        "contentVersion": "1.4.3.0.preview.2",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=V_A3DwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=V_A3DwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com.au/books?id=V_A3DwAAQBAJ&dq=isbn:0399178937&hl=&cd=1&source=gbs_api",
                        "infoLink": "http://books.google.com.au/books?id=V_A3DwAAQBAJ&dq=isbn:0399178937&hl=&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/All_We_Ever_Wanted.html?hl=&id=V_A3DwAAQBAJ"
                    },
                    "saleInfo": {
                        "country": "AU",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "AU",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": true
                        },
                        "pdf": {
                            "isAvailable": true
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=V_A3DwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "Dealing with issues of class, money, and race, All We Ever Wanted is the book everyone will be talking about.”—PopSugar “This complex and layered novel will give you all the feels.” —Brit + Co “This thought-provoking novel ..."
                    }
                }
            ]
        },
        {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "LfREDwAAQBAJ",
                    "etag": "jBJ5DoxiSFw",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/LfREDwAAQBAJ",
                    "volumeInfo": {
                        "title": "Clock Dance",
                        "subtitle": "A novel",
                        "authors": [
                            "Anne Tyler"
                        ],
                        "publisher": "Knopf",
                        "publishedDate": "2018-07-10",
                        "description": "A delightful novel of one woman's transformative journey, from the best-selling and Pulitzer Prize-winning writer. Willa Drake can count on one hand the defining moments of her life. In 1967, she is a schoolgirl coping with her mother's sudden disappearance. In 1977, she is a college coed considering a marriage proposal. In 1997, she is a young widow trying to piece her life back together. And in 2017, she yearns to be a grandmother but isn't sure she ever will be. Then, one day, Willa receives a startling phone call from a stranger. Without fully understanding why, she flies across the country to Baltimore to look after a young woman she's never met, her nine-year-old daughter, and their dog, Airplane. This impulsive decision will lead Willa into uncharted territory--surrounded by eccentric neighbors who treat each other like family, she finds solace and fulfillment in unexpected places. A bewitching novel of hope, self-discovery, and second chances, Clock Dance gives us Anne Tyler at the height of her powers.",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_13",
                                "identifier": "9780525521235"
                            },
                            {
                                "type": "ISBN_10",
                                "identifier": "0525521232"
                            }
                        ],
                        "readingModes": {
                            "text": true,
                            "image": false
                        },
                        "pageCount": 304,
                        "printType": "BOOK",
                        "categories": [
                            "Fiction"
                        ],
                        "averageRating": 3.5,
                        "ratingsCount": 5,
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": true,
                        "contentVersion": "1.2.2.0.preview.2",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=LfREDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=LfREDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com.au/books?id=LfREDwAAQBAJ&dq=isbn:0525521232&hl=&cd=1&source=gbs_api",
                        "infoLink": "http://books.google.com.au/books?id=LfREDwAAQBAJ&dq=isbn:0525521232&hl=&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/Clock_Dance.html?hl=&id=LfREDwAAQBAJ"
                    },
                    "saleInfo": {
                        "country": "AU",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "AU",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": true
                        },
                        "pdf": {
                            "isAvailable": true
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=LfREDwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "A bewitching novel of hope and transformation, Clock Dance gives us Anne Tyler at the height of her powers."
                    }
                }
            ]
        },
        {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "p3NEDwAAQBAJ",
                    "etag": "H7sdLdPLync",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/p3NEDwAAQBAJ",
                    "volumeInfo": {
                        "title": "Spymaster",
                        "subtitle": "A Thriller",
                        "authors": [
                            "Brad Thor"
                        ],
                        "publisher": "Simon and Schuster",
                        "publishedDate": "2018-07-03",
                        "description": "The newest thriller in the #1 New York Times, #1 Wall Street Journal, and #1 Publishers Weekly bestselling series! Across Europe, a secret organization has begun attacking diplomats. Back in the United States, a foreign ally demands the identity of a highly placed covert asset. In the balance hang the ingredients for all-out war. With his mentor out of the game, counterterrorism operative Scot Harvath must take on the role he has spent his career avoiding. But, as with everything else he does, he intends to rewrite the rules—all of them. In Spymaster, Scot Harvath is more cunning, more dangerous, and deadlier than ever before. If you have never read a Brad Thor novel, this is the place to start!",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_13",
                                "identifier": "9781476789439"
                            },
                            {
                                "type": "ISBN_10",
                                "identifier": "1476789436"
                            }
                        ],
                        "readingModes": {
                            "text": true,
                            "image": false
                        },
                        "pageCount": 336,
                        "printType": "BOOK",
                        "categories": [
                            "Fiction"
                        ],
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": true,
                        "contentVersion": "1.6.5.0.preview.2",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=p3NEDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=p3NEDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com.au/books?id=p3NEDwAAQBAJ&printsec=frontcover&dq=isbn:1476789436&hl=&cd=1&source=gbs_api",
                        "infoLink": "https://play.google.com/store/books/details?id=p3NEDwAAQBAJ&source=gbs_api",
                        "canonicalVolumeLink": "https://market.android.com/details?id=book-p3NEDwAAQBAJ"
                    },
                    "saleInfo": {
                        "country": "AU",
                        "saleability": "FOR_SALE",
                        "isEbook": true,
                        "listPrice": {
                            "amount": 12.99,
                            "currencyCode": "AUD"
                        },
                        "retailPrice": {
                            "amount": 12.99,
                            "currencyCode": "AUD"
                        },
                        "buyLink": "https://play.google.com/store/books/details?id=p3NEDwAAQBAJ&rdid=book-p3NEDwAAQBAJ&rdot=1&source=gbs_api",
                        "offers": [
                            {
                                "finskyOfferType": 1,
                                "listPrice": {
                                    "amountInMicros": 12990000,
                                    "currencyCode": "AUD"
                                },
                                "retailPrice": {
                                    "amountInMicros": 12990000,
                                    "currencyCode": "AUD"
                                },
                                "giftable": true
                            }
                        ]
                    },
                    "accessInfo": {
                        "country": "AU",
                        "viewability": "PARTIAL",
                        "embeddable": true,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
                        "epub": {
                            "isAvailable": true,
                            "acsTokenLink": "http://books.google.com.au/books/download/Spymaster-sample-epub.acsm?id=p3NEDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                        },
                        "pdf": {
                            "isAvailable": false
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=p3NEDwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
                        "accessViewStatus": "SAMPLE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "In Spymaster, Scot Harvath is more cunning, more dangerous, and deadlier than ever before. If you have never read a Brad Thor novel, this is the place to start!"
                    }
                }
            ]
        },
        {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "m6F_tAEACAAJ",
                    "etag": "+B44BNsLXOw",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/m6F_tAEACAAJ",
                    "volumeInfo": {
                        "title": "The Summer Wives",
                        "subtitle": "A Novel",
                        "authors": [
                            "Beatriz Williams"
                        ],
                        "publisher": "William Morrow",
                        "publishedDate": "2018-07-10",
                        "description": "“The Summer Wives is an exquisitely rendered novel that tackles two of my favorite topics: love and money. The glorious setting and drama are enriched by Williams’s signature vintage touch. It’s at the top of my picks for the beach this summer.” —Elin Hilderbrand, author of The Perfect Couple New York Times bestselling author Beatriz Williams brings us the blockbuster novel of the season—an electrifying postwar fable of love, class, power, and redemption set among the inhabitants of an island off the New England coast . . . In the summer of 1951, Miranda Schuyler arrives on elite, secretive Winthrop Island as a schoolgirl from the margins of high society, still reeling from the loss of her father in the Second World War. When her beautiful mother marries Hugh Fisher, whose summer house on Winthrop overlooks the famous lighthouse, Miranda’s catapulted into a heady new world of pedigrees and cocktails, status and swimming pools. Isobel Fisher, Miranda’s new stepsister—all long legs and world-weary bravado, engaged to a wealthy Island scion—is eager to draw Miranda into the arcane customs of Winthrop society. But beneath the island’s patrician surface, there are really two clans: the summer families with their steadfast ways and quiet obsessions, and the working class of Portuguese fishermen and domestic workers who earn their living on the water and in the laundries of the summer houses. Uneasy among Isobel’s privileged friends, Miranda finds herself drawn to Joseph Vargas, whose father keeps the lighthouse with his mysterious wife. In summer, Joseph helps his father in the lobster boats, but in the autumn he returns to Brown University, where he’s determined to make something of himself. Since childhood, Joseph’s enjoyed an intense, complex friendship with Isobel Fisher, and as the summer winds to its end, Miranda’s caught in a catastrophe that will shatter Winthrop’s hard-won tranquility and banish Miranda from the island for nearly two decades. Now, in the landmark summer of 1969, Miranda returns at last, as a renowned Shakespearean actress hiding a terrible heartbreak. On its surface, the Island remains the same—determined to keep the outside world from its shores, fiercely loyal to those who belong. But the formerly powerful Fisher family is a shadow of itself, and Joseph Vargas has recently escaped the prison where he was incarcerated for the murder of Miranda’s stepfather eighteen years earlier. What’s more, Miranda herself is no longer a naïve teenager, and she begins a fierce, inexorable quest for justice for the man she once loved . . . even if it means uncovering every last one of the secrets that bind together the families of Winthrop Island.",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_10",
                                "identifier": "0062660349"
                            },
                            {
                                "type": "ISBN_13",
                                "identifier": "9780062660343"
                            }
                        ],
                        "readingModes": {
                            "text": false,
                            "image": false
                        },
                        "pageCount": 384,
                        "printType": "BOOK",
                        "categories": [
                            "Fiction"
                        ],
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": false,
                        "contentVersion": "preview-1.0.0",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=m6F_tAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=m6F_tAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com.au/books?id=m6F_tAEACAAJ&dq=isbn:0062660349&hl=&cd=1&source=gbs_api",
                        "infoLink": "http://books.google.com.au/books?id=m6F_tAEACAAJ&dq=isbn:0062660349&hl=&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/The_Summer_Wives.html?hl=&id=m6F_tAEACAAJ"
                    },
                    "saleInfo": {
                        "country": "AU",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "AU",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": false
                        },
                        "pdf": {
                            "isAvailable": false
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=m6F_tAEACAAJ&hl=&printsec=frontcover&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "It’s at the top of my picks for the beach this summer.” —Elin Hilderbrand, author of The Perfect Couple New York Times bestselling author Beatriz Williams brings us the blockbuster novel of the season—an electrifying postwar fable ..."
                    }
                }
            ]
        },
        {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "F6BwswEACAAJ",
                    "etag": "GYwelsl2w6c",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/F6BwswEACAAJ",
                    "volumeInfo": {
                        "title": "Spinning Silver",
                        "authors": [
                            "Naomi Novik"
                        ],
                        "publisher": "Del Rey Books",
                        "publishedDate": "2018-07-10",
                        "description": "A fresh and imaginative retelling of the Rumpelstiltskin fairytale from the bestselling author of Uprooted, called \"a very enjoyable fantasy with the air of a modern classic\" by The New York Times Book Review. Miryem is the daughter and granddaughter of moneylenders, but her father is not a very good one. Free to lend and reluctant to collect, he has left his family on the edge of poverty--until Miryem intercedes. Hardening her heart, she sets out to retrieve what is owed, and soon gains a reputation for being able to turn silver into gold. But when an ill-advised boast brings her to the attention of the cold creatures who haunt the wood, nothing will be the same again. For words have power, and the fate of a kingdom will be forever altered by the challenge she is issued. Channeling the heart of the classic fairy tale, Novik deftly interweaves six distinct narrative voices--each learning valuable lessons about sacrifice, power and love--into a rich, multilayered fantasy that readers will want to return to again and again.",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_10",
                                "identifier": "0399180982"
                            },
                            {
                                "type": "ISBN_13",
                                "identifier": "9780399180989"
                            }
                        ],
                        "readingModes": {
                            "text": false,
                            "image": false
                        },
                        "pageCount": 480,
                        "printType": "BOOK",
                        "categories": [
                            "Fiction"
                        ],
                        "averageRating": 4.5,
                        "ratingsCount": 3,
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": false,
                        "contentVersion": "preview-1.0.0",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=F6BwswEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=F6BwswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com.au/books?id=F6BwswEACAAJ&dq=isbn:0399180982&hl=&cd=1&source=gbs_api",
                        "infoLink": "http://books.google.com.au/books?id=F6BwswEACAAJ&dq=isbn:0399180982&hl=&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/Spinning_Silver.html?hl=&id=F6BwswEACAAJ"
                    },
                    "saleInfo": {
                        "country": "AU",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "AU",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": false
                        },
                        "pdf": {
                            "isAvailable": false
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=F6BwswEACAAJ&hl=&printsec=frontcover&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "&quot;Miryem is the daughter and granddaughter of moneylenders, but her father is not a very good one."
                    }
                }
            ]
        },
        {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "rAgetAEACAAJ",
                    "etag": "pdADlQIHbYk",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/rAgetAEACAAJ",
                    "volumeInfo": {
                        "title": "Less (Winner of the Pulitzer Prize)",
                        "subtitle": "A Novel",
                        "authors": [
                            "Andrew Sean Greer"
                        ],
                        "publisher": "Back Bay Books",
                        "publishedDate": "2018-05-22",
                        "description": "A struggling novelist travels the world to avoid an awkward wedding in this hilarious Pulitzer Prize-winning novel full of \"arresting lyricism and beauty\" (New York Times Book Review). WINNER OF THE PULITZER PRIZE National Bestseller A New York Times Notable Book of 2017 A Washington Post Top Ten Book of 2017 A San Francisco Chronicle Top Ten Book of 2017 Longlisted for the Andrew Carnegie Medal for Excellence, the Lambda Award and the California Book Award \"I could not love LESS more.\"--Ron Charles, Washington Post \"Andrew Sean Greer's Less is excellent company. It's no less than bedazzling, bewitching and be-wonderful.\"--Christopher Buckley, New York Times Book Review Who says you can't run away from your problems? You are a failed novelist about to turn fifty. A wedding invitation arrives in the mail: your boyfriend of the past nine years is engaged to someone else. You can't say yes--it would be too awkward--and you can't say no--it would look like defeat. On your desk are a series of invitations to half-baked literary events around the world. QUESTION: How do you arrange to skip town? ANSWER: You accept them all. What would possibly go wrong? Arthur Less will almost fall in love in Paris, almost fall to his death in Berlin, barely escape to a Moroccan ski chalet from a Saharan sandstorm, accidentally book himself as the (only) writer-in-residence at a Christian Retreat Center in Southern India, and encounter, on a desert island in the Arabian Sea, the last person on Earth he wants to face. Somewhere in there: he will turn fifty. Through it all, there is his first love. And there is his last. Because, despite all these mishaps, missteps, misunderstandings and mistakes, Less is, above all, a love story. A scintillating satire of the American abroad, a rumination on time and the human heart, a bittersweet romance of chances lost, by an author The New York Times has hailed as \"inspired, lyrical,\" \"elegiac,\" \"ingenious,\" as well as \"too sappy by half,\" Less shows a writer at the peak of his talents raising the curtain on our shared human comedy.",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_10",
                                "identifier": "031631613X"
                            },
                            {
                                "type": "ISBN_13",
                                "identifier": "9780316316132"
                            }
                        ],
                        "readingModes": {
                            "text": false,
                            "image": false
                        },
                        "pageCount": 272,
                        "printType": "BOOK",
                        "categories": [
                            "Fiction"
                        ],
                        "averageRating": 4,
                        "ratingsCount": 21,
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": false,
                        "contentVersion": "preview-1.0.0",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=rAgetAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=rAgetAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com.au/books?id=rAgetAEACAAJ&dq=isbn:031631613X&hl=&cd=1&source=gbs_api",
                        "infoLink": "http://books.google.com.au/books?id=rAgetAEACAAJ&dq=isbn:031631613X&hl=&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/Less_Winner_of_the_Pulitzer_Prize.html?hl=&id=rAgetAEACAAJ"
                    },
                    "saleInfo": {
                        "country": "AU",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "AU",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": false
                        },
                        "pdf": {
                            "isAvailable": false
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=rAgetAEACAAJ&hl=&printsec=frontcover&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "WINNER OF THE PULITZER PRIZE National Bestseller A New York Times Notable Book of 2017 A Washington Post Top Ten Book of 2017 A San Francisco Chronicle Top Ten Book of 2017 Longlisted for the Andrew Carnegie Medal for Excellence, the Lambda ..."
                    }
                }
            ]
        },
        {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "HqRwtAEACAAJ",
                    "etag": "lE27tsjz44U",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/HqRwtAEACAAJ",
                    "volumeInfo": {
                        "title": "Eleanor Oliphant Is Completely Fine",
                        "authors": [
                            "Gail Honeyman"
                        ],
                        "publisher": "Penguin Books",
                        "publishedDate": "2018-06-05",
                        "description": "A Reese Witherspoon Book Club Pick \"Beautifully written and incredibly funny, Eleanor Oliphant Is Completely Fine is about the importance of friendship and human connection. I fell in love with Eleanor, an eccentric and regimented loner whose life beautifully unfolds after a chance encounter with a stranger; I think you will fall in love, too!\" --Reese Witherspoon \"This wacky, charming novel. . . draws you in with humor, then turns out to contain both a suspenseful subplot and a sweet romance. . . Hilarious and moving.\"--People No one's ever told Eleanor that life should be better than fine. Meet Eleanor Oliphant: She struggles with appropriate social skills and tends to say exactly what she's thinking. Nothing is missing in her carefully timetabled life of avoiding social interactions, where weekends are punctuated by frozen pizza, vodka, and phone chats with Mummy. But everything changes when Eleanor meets Raymond, the bumbling and deeply unhygienic IT guy from her office. When she and Raymond together save Sammy, an elderly gentleman who has fallen on the sidewalk, the three become the kinds of friends who rescue one another from the lives of isolation they have each been living. And it is Raymond's big heart that will ultimately help Eleanor find the way to repair her own profoundly damaged one. Soon to be a major motion picture produced by Reese Witherspoon, Eleanor Oliphant Is Completely Fine is the smart, warm, and uplifting story of an out-of-the-ordinary heroine whose deadpan weirdness and unconscious wit make for an irresistible journey as she realizes. . . The only way to survive is to open your heart.",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_10",
                                "identifier": "0735220697"
                            },
                            {
                                "type": "ISBN_13",
                                "identifier": "9780735220690"
                            }
                        ],
                        "readingModes": {
                            "text": false,
                            "image": false
                        },
                        "pageCount": 352,
                        "printType": "BOOK",
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": false,
                        "contentVersion": "preview-1.0.0",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=HqRwtAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=HqRwtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com.au/books?id=HqRwtAEACAAJ&dq=isbn:0735220697&hl=&cd=1&source=gbs_api",
                        "infoLink": "http://books.google.com.au/books?id=HqRwtAEACAAJ&dq=isbn:0735220697&hl=&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/Eleanor_Oliphant_Is_Completely_Fine.html?hl=&id=HqRwtAEACAAJ"
                    },
                    "saleInfo": {
                        "country": "AU",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "AU",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": false
                        },
                        "pdf": {
                            "isAvailable": false
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=HqRwtAEACAAJ&hl=&printsec=frontcover&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "A Reese Witherspoon Book Club Pick &quot;Beautifully written and incredibly funny, Eleanor Oliphant Is Completely Fine is about the importance of friendship and human connection."
                    }
                }
            ]
        },
        {
            "kind": "books#volumes",
            "totalItems": 1,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "gnNEDwAAQBAJ",
                    "etag": "3AA49Zu32EQ",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/gnNEDwAAQBAJ",
                    "volumeInfo": {
                        "title": "When Life Gives You Lululemons",
                        "authors": [
                            "Lauren Weisberger"
                        ],
                        "publisher": "Simon and Schuster",
                        "publishedDate": "2018-06-05",
                        "description": "***NEW YORK TIMES BESTSELLER*** Best Books of Summer 2018 Selection by Entertainment Weekly * Cosmopolitan * Harper's Bazaar * Redbook * Southern Living * Good Housekeeping * PureWow * PopSugar * Bustle * Entertainment Tonight * Star Magazine * St. Louis Post-Dispatch * Columbus Dispatch * Tampa Bay Times * BookTrib * HE SET HER UP. THEY’LL BRING HIM DOWN. Welcome to Greenwich, Connecticut, where the lawns and the women are perfectly manicured, the Tito’s and sodas are extra strong, and everyone has something to say about the infamous new neighbor. Let’s be clear: Emily Charlton does not do the suburbs. After leaving Miranda Priestly, she’s been working in Hollywood as an image consultant to the stars, but recently, Emily’s lost a few clients. She’s hopeless with social media. The new guard is nipping at her heels. She needs a big opportunity, and she needs it now. When Karolina Hartwell, a gorgeous former supermodel, is arrested for a DUI, her fall from grace is merciless. Her senator-husband leaves her, her Beltway friends disappear, and the tabloids pounce. In Karolina, Emily finds her comeback opportunity. But she quickly learns Greenwich is a world apart and that this comeback needs a team approach. So it is that Emily, the scorned Karolina, and their mutual friend Miriam, a powerful attorney turned stay-at-home suburban mom, band together to not only navigate the social land mines of suburban Greenwich but win back the hearts of the American public. Along the way, an indispensable ally emerges in one Miranda Priestly. With her signature wit, Lauren Weisberger offers an alluring look into a sexy, over-the-top world—and proves it’s style and substance together that gets the job done.",
                        "industryIdentifiers": [
                            {
                                "type": "ISBN_13",
                                "identifier": "9781476778464"
                            },
                            {
                                "type": "ISBN_10",
                                "identifier": "1476778469"
                            }
                        ],
                        "readingModes": {
                            "text": true,
                            "image": false
                        },
                        "pageCount": 352,
                        "printType": "BOOK",
                        "categories": [
                            "Fiction"
                        ],
                        "averageRating": 4,
                        "ratingsCount": 3,
                        "maturityRating": "NOT_MATURE",
                        "allowAnonLogging": true,
                        "contentVersion": "1.3.3.0.preview.2",
                        "panelizationSummary": {
                            "containsEpubBubbles": false,
                            "containsImageBubbles": false
                        },
                        "imageLinks": {
                            "smallThumbnail": "http://books.google.com/books/content?id=gnNEDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                            "thumbnail": "http://books.google.com/books/content?id=gnNEDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                        },
                        "language": "en",
                        "previewLink": "http://books.google.com.au/books?id=gnNEDwAAQBAJ&dq=isbn:1476778469&hl=&cd=1&source=gbs_api",
                        "infoLink": "http://books.google.com.au/books?id=gnNEDwAAQBAJ&dq=isbn:1476778469&hl=&source=gbs_api",
                        "canonicalVolumeLink": "https://books.google.com/books/about/When_Life_Gives_You_Lululemons.html?hl=&id=gnNEDwAAQBAJ"
                    },
                    "saleInfo": {
                        "country": "AU",
                        "saleability": "NOT_FOR_SALE",
                        "isEbook": false
                    },
                    "accessInfo": {
                        "country": "AU",
                        "viewability": "NO_PAGES",
                        "embeddable": false,
                        "publicDomain": false,
                        "textToSpeechPermission": "ALLOWED",
                        "epub": {
                            "isAvailable": true
                        },
                        "pdf": {
                            "isAvailable": true
                        },
                        "webReaderLink": "http://play.google.com/books/reader?id=gnNEDwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
                        "accessViewStatus": "NONE",
                        "quoteSharingAllowed": false
                    },
                    "searchInfo": {
                        "textSnippet": "Along the way, an indispensable ally emerges in one Miranda Priestly. With her signature wit, Lauren Weisberger offers an alluring look into a sexy, over-the-top world—and proves it’s style and substance together that gets the job done."
                    }
                }
            ]
        }
    ];

    constructor( private http: HttpClient ) {
    }

    public searchBooks( query: string, page: number = 1 ): Observable<any> {
        const startIndex = (page - 1) * this.maxResults;
        return this.http
            .get<{ items: IBook[] }>(`${this.GOOGLE_API_PATH}?q=${query}&startIndex=${startIndex}&maxResults=${this.maxResults}`)
            .pipe(map(( res: any ) => {
                const total_results = res.totalItems + startIndex;
                const total_pages = total_results / this.maxResults;
                return {
                    query: query,
                    page,
                    total_results,
                    total_pages,
                    results: res.items || []
                };
            }));
    }

    public retrieveBook( volumeId: string ): Observable<IBook> {
        return this.http.get<IBook>(`${this.GOOGLE_API_PATH}/${volumeId}`);
    }

    public getBookList( query: string ): Observable<any> {
        return this.http.get(`${this.NY_API_PATH}?api-key=${this.NY_API_KEY}&list-name=${query}`)
            .pipe(
                map(( res: any ) => res.results),
                map(( results: any[] ) => results.map(( r ) => r.book_details[0])),
                switchMap(books => {
                    return forkJoin(books.map(( book ) => {
                        return this.http
                            .get(`${this.GOOGLE_API_PATH}?q=isbn:${book.primary_isbn10}`)
                            .pipe(
                                map(( bs: any ) => {
                                    if (bs && bs.items) {
                                        return bs.items[0];
                                    }
                                })
                            );
                    }));
                }),
                map(( books ) => books.filter(( book ) => !!book)),
                map(( books ) => {
                    return {
                        query,
                        page: 1,
                        total_results: books.length,
                        total_pages: 1,
                        results: books
                    };
                }),
            );
    }
}
