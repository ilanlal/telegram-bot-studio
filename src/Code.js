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
        const contents = JSON.parse(e.postData.contents);
        // Handle the webhook event
        return WebhookHandler.handlePostUpdateRequest(contents);
    } catch (error) {

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