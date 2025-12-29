class EventHandler {
};

EventHandler.ViewModel = {
    OpenHomeCard: (e) => {
        return AppHandler.ViewModel
            .OpenHomeCard(e);
    },
    OpenAccountCard: (e) => {
        return AppHandler.ViewModel
            .OpenUserProfileCard(e);
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