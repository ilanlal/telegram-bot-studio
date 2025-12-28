class AppHandler {
};

AppHandler.ViewModel = {
    onOpenHomeCard: (e) => {
        return new AppHandler
            .ControllerWrapper()
            .handleOpenHomeCard(e);
    },
    onOpenUserProfileCard: (e) => {
        return new AppHandler
            .ControllerWrapper()
            .handleOpenUserProfileCard(e);
    },
    onOpenAboutCard: (e) => {
        return new AppHandler
            .ControllerWrapper()
            .handleOpenAboutCard(e);
    },
    onOpenHelpCard: (e) => {
        return new AppHandler
            .ControllerWrapper()
            .handleOpenHelpCard(e);
    },
    onActivatePremiumClicked: (e) => {
        return MembershipHandler.ViewModel
            .onActivatePremiumClicked(e);
    },
    onRevokeLicenseClicked: (e) => {
        return MembershipHandler.ViewModel
            .onRevokeLicenseClicked(e);
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
                        .pushCard(Plugins.BuildHomeCard({})))
                .build();
        } catch (error) {
            return this.handleOperationError(error);
        }
    }

    handleOpenUserProfileCard(e) {
        try {
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(
                            Plugins.BuildUserProfileCard({})))
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
                        .pushCard(Plugins.BuildAboutCard({})))
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
                            Plugins.BuildHelpCard({})
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