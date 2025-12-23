require('../../../tests');

const { ChannelsHandler } = require('./ChannelsHandler');

describe('Channels Handler', () => {
    beforeEach(() => {
        // Reset properties before each test
        PropertiesService.getDocumentProperties().deleteAllProperties();
        PropertiesService.getUserProperties().deleteAllProperties();
        PropertiesService.getScriptProperties().deleteAllProperties();
        UrlFetchAppStubConfiguration.reset();
    });

    test('should create an instance of ChannelsHandler', () => {
        const handler = new ChannelsHandler();
        expect(handler).toBeInstanceOf(ChannelsHandler);
    });

    test('should handle getChatInfo', () => {
        const handler = new ChannelsHandler();
        const event = {
            commonEventObject: {
                formInputs: {
                    'chat_id': { stringInputs: { value: ['-1001234567890'] } }
                }
            }
        }; // Mock event object

        const dummyToken = 'DUMMY_BOT_TOKEN';
        // Set dummy bot token in script properties
        PropertiesService.getScriptProperties().setProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN, dummyToken);

        // Mock the sendMessage API response
        const getChatUrl = `https://api.telegram.org/bot${dummyToken}/getChat?chat_id=-1001234567890`;
        UrlFetchAppStubConfiguration.when(getChatUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({
                    // ChatFullInfo response structure
                    ok: true,
                    result: {
                        id: -1001234567890,
                        title: "Test Channel",
                        type: "channel",
                        username: "testchannel",
                        first_name: "Test",
                        last_name: "Channel",
                        active_usernames: ["testchannel"],
                        description: "This is a test channel",
                        invite_link: "https://t.me/joinchat/testinvite",
                        pinned_message: null
                    }
                })));

        const actionResponse = ChannelsHandler.View.onGetChatClick(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
    });
});
