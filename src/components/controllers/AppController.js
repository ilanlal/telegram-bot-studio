class AppController {
    get cardService() {
        if (!this._cardService) {
            this._cardService = CardService;
        }
        return this._cardService;
    }

    get activeSpreadsheet() {
        if (!this._activeSpreadsheet) {
            this._activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        }
        return this._activeSpreadsheet;
    }

    constructor() {
        this._cardService = null;
        this._activeSpreadsheet = null;
    }

    newCardBuilder(cardMeta = {}) {
        const cardServiceWrapper = new AppController.CardServiceWrapper(this.cardService);

        const cardBuilder = this.cardService.newCardBuilder();
        // Set card name
        if (cardMeta.name)
            cardBuilder.setName(cardMeta.name);

        // Set card header
        if (cardMeta.header) {
            cardBuilder.setHeader(
                cardServiceWrapper.newCardHeader(cardMeta.header));
        }

        // Set fixed footer if provided
        if (cardMeta.fixedFooter) {
            cardBuilder.setFixedFooter(
                cardServiceWrapper.newFixedFooter(cardMeta.fixedFooter)
            );
        }

        // Add sections
        if (cardMeta.sections && Array.isArray(cardMeta.sections)) {
            cardMeta.sections.forEach(section => {
                cardBuilder.addSection(
                    cardServiceWrapper.newCardSection(section));
            });
        }

        return cardBuilder;
    }
}

AppController.CardServiceWrapper = class {
    constructor(cardService) {
        // Use the global CardService in Apps Script environment
        this._cardService = cardService;
    }

    newCardHeader(headerMeta = {}) {
        return this._cardService.newCardHeader()
            .setTitle(headerMeta.title || '')
            .setSubtitle(headerMeta.subTitle || headerMeta.subtitle || '')
            .setImageStyle(headerMeta.imageStyle || CardService.ImageStyle.SQUARE)
            .setImageUrl(headerMeta.imageUrl || EMD.DEFAULT_IMAGE_URL)
            .setImageAltText(headerMeta.imageAltText || 'Card Image');
    }

    newFixedFooter(fixedFooterMeta = {}) {
        if (!fixedFooterMeta.primaryButton) {
            throw new Error("FixedFooter must have a 'primaryButton' property defined.");
        }
        const fixedFooter = this._cardService.newFixedFooter();
        fixedFooter.setPrimaryButton(
            this.newTextButton(fixedFooterMeta.primaryButton.textButton));

        if (fixedFooterMeta.secondaryButton) {
            fixedFooter.setSecondaryButton(
                this.newTextButton(fixedFooterMeta.secondaryButton.textButton)
            );
        }

        return fixedFooter;
    }

    newCardSection(sectionMeta = {}) {
        const cardSection = this._cardService.newCardSection();
        cardSection.setHeader(sectionMeta.header || '');
        cardSection.setCollapsible(sectionMeta.collapsible || false);
        cardSection.setNumUncollapsibleWidgets(sectionMeta.numUncollapsibleWidgets || 0);
        // cardSection.setCollapserControl(section.collapseControl || 'COLLAPSE_CONTROL_NONE');

        if (sectionMeta.widgets && Array.isArray(sectionMeta.widgets)) {
            sectionMeta.widgets.forEach(widgetMeta => {
                const cardWidget = this.newWidget(widgetMeta);
                if (cardWidget) {
                    cardSection.addWidget(cardWidget);
                }
            });
        }

        return cardSection;
    }

    newWidget(widgetMeta = {}) {
        const value = widgetMeta.value;

        if (widgetMeta.DecoratedText) {
            return this.newDecoratedText(widgetMeta.DecoratedText, value);
        }

        if (widgetMeta.TextInput) {
            return this.newTextInput(widgetMeta.TextInput, value);
        }

        if (widgetMeta.TextParagraph) {
            return this.newTextParagraph(widgetMeta.TextParagraph, value);
        }

        if (widgetMeta.TextButton) {
            return this.newTextButton(widgetMeta.TextButton);
        }

        if (widgetMeta.SelectionInput) {
            return this.newSelectionInput(widgetMeta.SelectionInput, value);
        }

        if (widgetMeta.Switch) {
            return this.newSwitch(widgetMeta.Switch, value);
        }

        throw new Error(`Unsupported widget type in widgetMeta: ${JSON.stringify(widgetMeta)}`);
    }

    newDecoratedText(dtMeta = {}, value = '') {
        // setText(text) and one of the keys: setTopLabel(text), or setBottomLabel(text) are required
        if (!dtMeta.text) {
            throw new Error("DecoratedText must have a non-empty 'text' property defined.");
        }
        if (!dtMeta.topLabel && !dtMeta.bottomLabel) {
            throw new Error("DecoratedText must have either 'topLabel' or 'bottomLabel' property defined.");
        }
        const decoratedText = this._cardService.newDecoratedText();

        if (dtMeta.topLabel)
            decoratedText.setTopLabel(`${dtMeta.topLabel}`);
        if (dtMeta.wrapText)
            decoratedText.setWrapText(dtMeta.wrapText);
        if (dtMeta.text)
            decoratedText.setText(`${dtMeta.text}`);
        if (dtMeta.bottomLabel)
            decoratedText.setBottomLabel(`${dtMeta.bottomLabel}`);

        if (dtMeta.textButton || dtMeta.TextButton) {
            decoratedText.setButton(
                this.newTextButton(dtMeta.textButton || dtMeta.TextButton));
        }

        if (dtMeta.switchControl || dtMeta.SwitchControl || dtMeta.Switch || dtMeta.switch) {
            decoratedText.setSwitchControl(
                this.newSwitch(dtMeta.switchControl || dtMeta.SwitchControl || dtMeta.Switch || dtMeta.switch)
            );
        }

        return decoratedText;
    }

    newTextInput(inputTextMeta = {}, value = '') {
        if (!inputTextMeta.fieldName || String(inputTextMeta.fieldName).trim() === '') {
            throw new Error("TextInput must have a non-empty 'fieldName' property defined.");
        }

        const textInput = CardService.newTextInput()
            .setFieldName(inputTextMeta.fieldName)
            .setTitle(inputTextMeta.title || '');

        if (inputTextMeta.value) {
            textInput.setValue(inputTextMeta.value);
        }
        else if (value) {
            textInput.setValue(value);
        }

        if (inputTextMeta.inputMode) {
            textInput.setInputMode(inputTextMeta.inputMode);
        }

        if (inputTextMeta.hint) {
            textInput.setHint(inputTextMeta.hint);
        }

        if (inputTextMeta.multiline) {
            textInput.setMultiline(inputTextMeta.multiline);
        }

        if (inputTextMeta.validation) {
            const validationBuilder = CardService.newValidation();
            if (inputTextMeta.validation.characterLimit) {
                validationBuilder.setCharacterLimit(inputTextMeta.validation.characterLimit);
            }
            if (inputTextMeta.validation.type) {
                validationBuilder.setInputType(inputTextMeta.validation.type);
            }
            textInput.setValidation(validationBuilder);
        }
        return textInput;
    }

    newTextParagraph(tpMeta = {}, value = '') {
        const newTextParagraph = CardService.newTextParagraph()
            .setText(tpMeta.text || '');
        if (tpMeta.maxLines) {
            newTextParagraph.setMaxLines(tpMeta.maxLines);
        }
        return newTextParagraph;
    }

    newTextButton(textButtonMeta = {}) {
        if (!textButtonMeta.text && !(textButtonMeta.openLink || textButtonMeta.onClick)) {
            throw new Error("TextButton must have either 'openLink' or 'onClick' property defined.");
        }

        const _textButton = this._cardService.newTextButton()
            .setText(textButtonMeta.text)
            .setDisabled(!!textButtonMeta.disabled)
            .setTextButtonStyle(textButtonMeta.textButtonStyle || CardService.TextButtonStyle.TEXT);

        if (textButtonMeta.openLink) {
            _textButton.setOpenLink(this._cardService.newOpenLink().setUrl(textButtonMeta.openLink.url || ''));
        }
        else if (textButtonMeta.onClick) {
            const newAction = this._cardService.newAction()
                .setFunctionName(textButtonMeta.onClick.functionName);

            if (textButtonMeta.onClick.parameters) {
                newAction.setParameters(textButtonMeta.onClick.parameters);
            }

            if (textButtonMeta.onClick.requiredWidgets) {
                const allRequiredWidgets = Array.isArray(textButtonMeta.onClick.requiredWidgets)
                    ? textButtonMeta.onClick.requiredWidgets
                    : [textButtonMeta.onClick.requiredWidgets];

                // Add each required fieldName to the action
                allRequiredWidgets.forEach(
                    fieldName => newAction.addRequiredWidget(fieldName)
                );
            }

            _textButton.setOnClickAction(newAction);
        }
        else {
            throw new Error("TextButton must have either 'openLink' or 'onClick' property defined.");
        }
        return _textButton;
    }

    newSelectionInput(selectionInputMeta = {}, value = '') {
        if (!selectionInputMeta.fieldName) {
            throw new Error('SelectionInput widget must have a "fieldName" property.');
        }

        const selectionInput = this._cardService.newSelectionInput()
            .setFieldName(selectionInputMeta.fieldName);

        if (selectionInputMeta.title)
            selectionInput.setTitle(selectionInputMeta.title);

        if (selectionInputMeta.type)
            selectionInput.setType(selectionInputMeta.type);

        // CardService.Visibility.VISIBLE or CardService.Visibility.HIDDEN
        if (selectionInputMeta.visibility)
            selectionInput.setVisibility(selectionInputMeta.visibility);

        if (selectionInputMeta.externalDataSource) {
            selectionInput.setExternalDataSource(
                CardService.newAction()
                    // This 'Handler' function should return a SuggestionsResponse object.
                    .setFunctionName(selectionInputMeta.externalDataSource.functionName));
        }
        else if (selectionInputMeta.items && Array.isArray(selectionInputMeta.items)) {
            selectionInputMeta.items.forEach(item => {
                selectionInput.addItem(
                    item.text || '',
                    item.value || '',
                    !!item.selected
                );
            });
        }
        return selectionInput;
    }

    newSwitch(switchMeta = {}, selected = false) {
        if (!switchMeta.fieldName) {
            throw new Error('Switch widget must have a "fieldName" property.');
        }

        const switchWidget = this._cardService.newSwitch()
            // Sets the name of the field that is associated with this switch.
            .setFieldName(switchMeta.fieldName)
            // Sets the value that is sent as the form input when this switch is toggled on.
            .setValue(switchMeta.value || 'ON')
            // Sets whether this switch should start as selected or unselected.
            .setSelected(switchMeta.selected || selected);

        // Set onChange action if provided
        if (switchMeta.onChangeAction) {
            const action = this._cardService.newAction()
                .setFunctionName(switchMeta.onChangeAction.functionName);
            switchWidget.setOnChangeAction(action);
        }

        return switchWidget;
    }

    newImage(imageMeta = {}) {
        if (!imageMeta.imageUrl) {
            throw new Error("Image widget must have an 'imageUrl' property defined.");
        }
        const imageWidget = this._cardService.newImage()
            .setImageUrl(imageMeta.imageUrl)
            .setAltText(imageMeta.altText || 'Image');
        return imageWidget;
    }

    newImageButton(imageButtonMeta = {}) {
        if (!imageButtonMeta.imageUrl) {
            throw new Error("ImageButton widget must have an 'imageUrl' property defined.");
        }
        const imageButton = this._cardService.newImageButton()
            .setImageUrl(imageButtonMeta.imageUrl)
            .setAltText(imageButtonMeta.altText || 'Image Button');
        if (imageButtonMeta.onClick) {
            const action = this._cardService.newAction()
                .setFunctionName(imageButtonMeta.onClick.functionName);
            imageButton.setOnClickAction(action);
        }
        return imageButton;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppController
    };
}