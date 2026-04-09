/* eslint-disable no-unused-vars */
/** 
 * @see https://developers.google.com/apps-script/guides/triggers
 */
function onInstall(e) {
    onOpen(e);
}

/** 
 * @see https://developers.google.com/apps-script/guides/triggers
 * @see https://docs.google.com/document/d/1v1wmNKzckcgCwe46gIytjaMdR04HaLLIwsj0idDNF-M/edit?tab=t.0
 */
function onOpen(e) {

}

/**
 * @see https://developers.google.com/apps-script/guides/web
 */
function doGet(e) {
    // return html content
    let htmlContent = '<h1>Telegram Bot Studio</h1>';
    htmlContent += '<p>Welcome to Telegram Bot Studio for Google Sheets!</p>';
    htmlContent += '<p>Use the sidebar to access various plugins and features to enhance your Telegram bot development experience.</p>';
    
    if (typeof HtmlService !== 'undefined') {
        return HtmlService.createHtmlOutput(htmlContent);
    } else {
        return null;
    }
}

// Export the functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        onInstall,
        onOpen,
        doGet
    };
}