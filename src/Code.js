/** 
 * @see https://developers.google.com/apps-script/guides/triggers
 */
function onInstall(e) {
    onOpen(e);
}

function onOpen(e) {

}

function doGet(e) {
    return JSON.stringify({ status: 'ok' });
}

function doPost(e) {
    try {
        const contents = JSON.parse(e.postData.contents) || {};
        LoggerModel.create()
            .logEvent({
                dc: 'Code_doPost',
                action: 'doPost',
                chat_id: '0000',
                content: JSON.stringify(e),
                event: JSON.stringify(contents)
            });
        // Handle the webhook event
        return WebhookHandler.handlePostUpdateRequest(e.postData);
    } catch (error) {
        LoggerModel.create()
            .logError({
                dc: '@doPost.error',
                action: JSON.stringify(e),
                chat_id: '0000',
                content: error.toString(),
                event: error.stack
            });
        throw error;
    }
}

// Export the functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        onInstall,
        onOpen,
        doGet,
        doPost
    };
}