class EventHandler {
};

EventHandler.ViewModel = {
    onOpenHomeCard: (e) => {
        return NavigationHandler.ViewModel
            .onPushCardClick({ parameters: { template: 'EMD.Cards.Home' } });
    },
    onOpenAccountCard: (e) => {
        return NavigationHandler.ViewModel
            .onPushCardClick({ parameters: { template: 'EMD.Cards.Account' } });
    },
    onOpenAboutCard: (e) => {
        return NavigationHandler.ViewModel
            .onPushCardClick({ parameters: { template: 'EMD.Cards.About' } });
    },
    onOpenHelpCard: (e) => {
        return NavigationHandler.ViewModel
            .onPushCardClick({ parameters: { template: 'EMD.Cards.Help' } });
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EventHandler
    };
}