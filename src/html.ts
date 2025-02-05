import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import { Bookmark, BookmarkGroup } from './types';

const dom = new JSDOM();
const document = dom.window.document;
let html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>`;

function generateBookmarkHTML(bookmarkGroup: BookmarkGroup): string {
    Object.values(bookmarkGroup).forEach((bookmark) => {
        html += generateHRow(bookmark.name);
        // console.log(bookmark.name);
        bookmark.bookmarks.forEach((link) => {
            // html += generateLinkRow(link);
            generateLinkRow(link);
        });
        html += `</DL><p>`;
    });

    html += `</DL><p>`;
    return html;
}

function generateHRow(title: string): string {
    const header = document.createElement('H3');
    const dlElement = document.createElement('DL');
    const dtElement = document.createElement('DT');
    dtElement.innerText = title;
    dlElement.appendChild(dtElement);
    header.appendChild(dlElement);
    return header.outerHTML;
}

function generateLinkRow(bookmark: Bookmark): string {
    console.log(bookmark.title);
    // const dom = new JSDOM();
    // const document = dom.window.document;
    // const link = document.createElement('A');
    // link.href = bookmark.url;
    // link.innerText = bookmark.title;
    // return link.outerHTML;
    return '';
}

export function SaveHTMLToFile(filename: string, bookmarkGroup: BookmarkGroup): void {
    const html = generateBookmarkHTML(bookmarkGroup);
    fs.writeFileSync(filename, html, 'utf8');
}
