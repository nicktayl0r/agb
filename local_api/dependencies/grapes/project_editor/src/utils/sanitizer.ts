// const cleaner = require('clean-html');

// const options = {
//     'add-remove-tags': ['table', 'tr', 'td', 'blockquote', 'span']
// };


// export function SanitizeRubricHTML(dirtyHTML: string) {
//     const cleanHTML = cleaner.clean(dirtyHTML, options, );

//     return cleanHTML;
// }


import sanitizeHtml from 'sanitize-html';

export function SanitizeRubricHTML(dirtyHTML: string) {
    const cleanHTML = sanitizeHtml(dirtyHTML, {
        allowedTags: ['h3', 'h4', 'h5', 'h6', 'b', 'i', 'em', 'strong', 'a', 'ul', 'li', 'br', 'ol', 'sup', 'sub'],
        selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
        allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
        allowedSchemesByTag: {},
        allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
        allowProtocolRelative: true,
        enforceHtmlBoundary: false,
        allowedAttributes: {
            'a': ['href']
        }
    });

    return cleanHTML;
}