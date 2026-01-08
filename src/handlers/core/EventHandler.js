class EventHandler {
};

EventHandler.ViewModel = {
    OpenHomeCard: (e) => {
        return AppHandler.ViewModel
            .OpenHomeCard(e);
    },
    OpenProfileCard: (e) => {
        return AppHandler.ViewModel
            .OpenUserProfileCard(e);
    },
    OpenSettingsCard: (e) => {
        return AppHandler.ViewModel
            .OpenSettingsCard(e);
    },
    OpenAboutCard: (e) => {
        return AppHandler.ViewModel
            .OpenAboutCard(e);
    },
    OpenHelpCard: (e) => {
        return AppHandler.ViewModel
            .OpenHelpCard(e);
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EventHandler
    };
}