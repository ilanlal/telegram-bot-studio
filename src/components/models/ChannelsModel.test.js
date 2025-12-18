require('../../../tests');
const { ChannelsModel } = require('./ChannelsModel');

describe('ChannelsModel', () => {
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });

    it('should create an ChannelsModel', () => {
        const model = ChannelsModel.create();
        expect(model).toBeInstanceOf(ChannelsModel);
    });

    // getChat
    test('should get chat information for a valid chat ID', () => {
        const dummyChatId = '-1001234567890';
        const dummyToken = 'DUMMY_BOT_TOKEN';

        // Set dummy bot token in script properties
        PropertiesService.getScriptProperties().setProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN, dummyToken);
        const model = ChannelsModel.create();

        // Mock the getChat API response
        const getChatUrl = `https://api.telegram.org/bot${dummyToken}/getChat?chat_id=${dummyChatId}`;
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
        const chatInfo = model.getChat(dummyChatId);
        expect(chatInfo).toBeDefined();
        expect(chatInfo.id).toBe(-1001234567890);
        expect(chatInfo.title).toBe("Test Channel");
    });

    // Additional tests for ChannelsModel methods can be added here
    afterEach(() => {
        UrlFetchAppStubConfiguration.reset();
        PropertiesService.getDocumentProperties().deleteAllProperties();
        PropertiesService.getUserProperties().deleteAllProperties();
        PropertiesService.getScriptProperties().deleteAllProperties();
        jest.clearAllMocks();
    });
});