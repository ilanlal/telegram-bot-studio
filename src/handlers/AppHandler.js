class AppHandler {
};

AppHandler.ViewModel = {
    OpenHomeCard: (e) => {
        return new AppHandler
            .ControllerWrapper()
            .handleOpenHomeCard(e);
    },
    OpenUserProfileCard: (e) => {
        return new AppHandler
            .ControllerWrapper()
            .handleOpenUserProfileCard(e);
    },
    OpenSettingsCard: (e) => {
        return new AppHandler
            .ControllerWrapper()
            .handleOpenSettingsCard(e);
    },
    OpenAboutCard: (e) => {
        return new AppHandler
            .ControllerWrapper()
            .handleOpenAboutCard(e);
    },
    OpenHelpCard: (e) => {
        return new AppHandler
            .ControllerWrapper()
            .handleOpenHelpCard(e);
    },
    ToggleAction(e) {
        return new AppHandler
            .ControllerWrapper()
            .handleToggleAction(e);
    }
}

AppHandler.ControllerWrapper = class {
    constructor() {
    }

    handleOpenHomeCard(e) {
        try {
            return Plugins.HomeCard.OnLoad(e);
        } catch (error) {
            return this.handleOperationError(error);
        }
    }

    handleOpenUserProfileCard(e) {
        try {
            const data = {
                ...AppModel.create().toJSON()
            };
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(
                            Plugins.UserProfile.HomeCard(data)))
                .build();
        } catch (error) {
            return this.handleOperationError(error);
        }
    }

    handleOpenSettingsCard(e) {
        try {
            const data = {
                ...AppModel.create().toJSON()
            };
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(
                            Plugins.Settings.HomeCard(data)))
                .build();
        } catch (error) {
            return this.handleOperationError(error);
        }
    }

    handleOpenAboutCard(e) {
        try {
            const data = {
                ...AppModel.create().toJSON()
            };
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(Plugins.ViewModel.BuildAboutCard(data)))
                .build();
        } catch (error) {
            return this.handleOperationError(error);
        }
    }

    handleOpenHelpCard(e) {
        try {
            const data = {
                ...AppModel.create().toJSON()
            };
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(
                            Plugins.ViewModel.BuildHelpCard(data)
                        )
                ).build();
        } catch (error) {
            return this.handleOperationError(error);
        }
    }

    handleToggleAction(e) {
        try {
            TerminalOutput.Write(SpreadsheetApp.getActiveSpreadsheet(),
                'AppHandler.ControllerWrapper.handleToggleAction',
                'INFO',
                e,
                `-------------------------`);
            const actionName = e?.commonEventObject?.parameters?.actionName;
            // actionName like: 'debug_mode_switch' or 'form_input_switch_key'
            const preState = e?.commonEventObject?.formInputs?.[actionName]?.stringInputs?.value?.[0];
            // store the new state within user properties or perform necessary actions
            PropertiesService.getUserProperties().setProperty(actionName, preState === 'ON' ? 'ON' : 'OFF');
            // return success notification
            return CardService.newActionResponseBuilder()
                .setNotification(
                    CardService.newNotification()
                        .setText(`👋 Action "${actionName}" has been state: ${preState === 'ON' ? '✅ On' : '📴 Off'}.`))
                .build();
        } catch (error) {
            return this.handleOperationError(error);
        }
    }

    handleOperationError(error) {
        TerminalOutput.Write(SpreadsheetApp.getActiveSpreadsheet(),
            'AppHandler.ControllerWrapper.handleOperationError',
            'ERROR',
            error,
            error.toString());

        // Show an error message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()))
            .build();
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppHandler
    };
}