import { readFile, access, readdir } from 'fs/promises';
import { join } from 'path';
import { StorableSidebar, BookmarkGroup, Bookmark } from './types';
import { SaveHTMLToFile } from './html';
import { logger } from './logger';

class JsonFileReader {
    private static validateJson<T>(data: unknown): data is T {
        return typeof data === 'object' && data !== null;
    }

    async readJsonFile<T>(filePath: string): Promise<T | null> {
        try {
            const fullPath = join(filePath);
            logger.info('Reading file:', fullPath);
            try {
                await access(fullPath);
            } catch (error) {
                console.error(`File ${filePath} not found`);
                return null;
            }

            // Check if file exists
            await readFile(fullPath, 'utf-8');

            const data = await readFile(fullPath, 'utf-8');
            const parsedData = JSON.parse(data);

            if (!JsonFileReader.validateJson(parsedData)) {
                console.error('Invalid JSON format');
                return null;
            }

            return parsedData as T;
        } catch (error) {
            console.error(`Error reading ${filePath}:`, error);
            return null;
        }
    }
}

// Usage
const fileName = process.argv[2] ?? process.env.FILE_NAME;
if (!fileName) {
    console.error(
        'Please provide a file name as an argument or set the FILE_NAME environment variable',
    );
    process.exit(1);
}

const bookmarks: BookmarkGroup = {};

const reader = new JsonFileReader();
reader.readJsonFile<StorableSidebar>(fileName).then((sidebarData) => {
    if (sidebarData) {
        sidebarData.sidebar.containers.forEach((container) => {
            container.spaces?.forEach((space) => {
                if (typeof space === 'string' && !bookmarks[space]) {
                    bookmarks[space] = { name: space, bookmarks: [] };
                }
            });
            container.items?.forEach((item) => {
                if (typeof item === 'string') {
                    if (!bookmarks[item]) {
                        bookmarks[item] = { name: '', bookmarks: [] };
                    }
                } else {
                    if (item.childrenIds.length !== 0) {
                        item.childrenIds.forEach((childId) => {
                            if (bookmarks[childId]) {
                                if (!bookmarks[childId].name) {
                                    console.log('setting name', item.title);
                                    bookmarks[childId].name = item.title;
                                }
                            } else {
                                bookmarks[childId] = { name: item.title, bookmarks: [] };
                            }
                        });
                    }
                    if (bookmarks[item.parentID]) {
                        if (!bookmarks[item.parentID].name) {
                            bookmarks[item.parentID].name = item.title;
                        }
                        const bookmark: Bookmark = {
                            id: item.id,
                            title: item.data.tab?.savedTitle || item.title,
                            url: item.data.tab?.savedURL || '',
                        };
                        bookmarks[item.parentID].bookmarks.push(bookmark);
                    } else {
                    }
                }
            });
        });
        // Object.values(bookmarks).forEach((group) => {
        //     if (group.bookmarks.length !== 0) {
        //         console.log(`Group: ${group.name}`);
        //         console.table(group.bookmarks);
        //     }
        // });
        SaveHTMLToFile('converted.html', bookmarks);
    }
});
