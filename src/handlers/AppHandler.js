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
    ActivatePremium: (e) => {
        return MembershipHandler.ViewModel
            .ActivatePremium(e);
    },
    RevokeLicense: (e) => {
        return MembershipHandler.ViewModel
            .RevokeLicense(e);
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
            const data = {
                ...AppModel.create().toJSON()
            }
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(Plugins.ViewModel.BuildHomeCard(data)))
                .build();
        } catch (error) {
            return this.handleOperationError(error);
        }
    }

    handleOpenUserProfileCard(e) {
        try {
            const debug_mode_switch = (e.commonEventObject?.formInputs?.debug_mode_switch)
                ? e.commonEventObject.formInputs.debug_mode_switch.stringInputs.value[0]
                : 'OFF';
            const data = {
                debug_mode_switch,
                ...AppModel.create().toJSON()
            };
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(
                            Plugins.ViewModel.BuildUserProfileCard(data)))
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
            SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'client', // chat side
                    'Toggle action',
                    JSON.stringify({ e }) // placeholder
                ]);
            const actionName = e?.commonEventObject?.parameters?.actionName;
            
            const state = e?.commonEventObject?.formInputs?.[actionName]?.stringInputs?.value?.[0];
            // actionName like: 'debug_mode_switch' or 'form_input_switch_key'
            // Perform the toggle action logic here
            // For example, update user settings or preferences
            return CardService.newActionResponseBuilder()
                .setNotification(
                    CardService.newNotification()
                        .setText(`👋 Action "${actionName}" has been state: ${state==='ON' ? '✅ On' : '📴 Off'}.`))
                .build();
        } catch (error) {
            return this.handleOperationError(error);
        }
    }

    handleOperationError(error) {
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