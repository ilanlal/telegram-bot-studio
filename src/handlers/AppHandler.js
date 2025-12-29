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
    }
}

AppHandler.ControllerWrapper = class {
    constructor() {
    }

    handleOpenHomeCard(e) {
        try {
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(Plugins.ViewModel.BuildHomeCard({})))
                .build();
        } catch (error) {
            return this.handleOperationError(error);
        }
    }

    handleOpenUserProfileCard(e) {
        try {
            const data = {};
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
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(Plugins.ViewModel.BuildAboutCard({})))
                .build();
        } catch (error) {
            return this.handleOperationError(error);
        }
    }

    handleOpenHelpCard(e) {
        try {
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(
                            Plugins.ViewModel.BuildHelpCard({})
                        )
                ).build();
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