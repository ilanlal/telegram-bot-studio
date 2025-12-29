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
    ActivatePremiumClicked: (e) => {
        return MembershipHandler.ViewModel
            .ActivatePremiumClicked(e);
    },
    RevokeLicenseClicked: (e) => {
        return MembershipHandler.ViewModel
            .RevokeLicenseClicked(e);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EventHandler
    };
}