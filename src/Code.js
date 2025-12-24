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
        const postData = JSON.parse(e.postData);
        // Handle the webhook event
        return WebhookHandler.handlePostUpdateRequest(postData);
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