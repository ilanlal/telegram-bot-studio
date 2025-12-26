class CardViewModel {
    static create({
        cardService = CardService,
        documentProperties = PropertiesService.getDocumentProperties(),
        userProperties = PropertiesService.getUserProperties(),
        scriptProperties = PropertiesService.getScriptProperties()
    } = {}) {
        return new CardViewModel({
            cardWrapper: CardViewModel.CardServiceWrapper.create(cardService, documentProperties, userProperties, scriptProperties)
        });
    }

    constructor({ cardWrapper } = {}) {
        this._cardWrapper = cardWrapper;
    }

    /** @returns {CardViewModel.CardServiceWrapper} */
    get cardWrapper() {
        return this._cardWrapper;
    }
};

CardViewModel.CardServiceWrapper = class {
    static create(
        cardService = CardService,
        documentProperties = PropertiesService.getDocumentProperties(),
        userProperties = PropertiesService.getUserProperties(),
        scriptProperties = PropertiesService.getScriptProperties()
    ) {
        return new CardViewModel.CardServiceWrapper(cardService, documentProperties, userProperties, scriptProperties);
    }

    constructor(cardService, documentProperties, userProperties, scriptProperties) {
        // Use the global CardService in Apps Script environment
        this._cardService = cardService;
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
    }

    newCardBuilder(cardMeta = {}) {
        const cardBuilder = this._cardService.newCardBuilder();

        // Set card name
        cardBuilder.setName(`${cardMeta.name || 'No Name'}`);

        // Set card header
        if (cardMeta.header) {
            cardBuilder.setHeader(
                this.newCardHeader(cardMeta.header));
        }

        // Set fixed footer if provided
        if (cardMeta.fixedFooter) {
            cardBuilder.setFixedFooter(
                this.newFixedFooter(cardMeta.fixedFooter)
            );
        }

        // Add sections
        if (cardMeta.sections && Array.isArray(cardMeta.sections)) {
            cardMeta.sections.forEach(section => {
                cardBuilder.addSection(
                    this.newCardSection(section));
            });
        }

        return cardBuilder;
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
            throw new Error(CardViewModel.ErrorMessages.FIXED_FOOTER_BUTTON_NOT_DEFINED_ERROR);
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

        throw new Error(`Unsupported widget type in widgetMeta: ${JSON.stringify(widgetMeta)}`);
    }

    newDecoratedText(dtMeta = {}, value = '') {
        // setText(text) and one of the keys: setTopLabel(text), or setBottomLabel(text) are required
        if (!dtMeta.text) {
            throw new Error(CardViewModel.ErrorMessages.DECORATED_TEXT_MISSING_CONTENT_ERROR);
        }
        if (!dtMeta.topLabel && !dtMeta.bottomLabel) {
            throw new Error(CardViewModel.ErrorMessages.DECORATED_TEXT_MISSING_CONTENT_ERROR);
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

        return decoratedText;
    }

    newTextInput(inputTextMeta = {}, value = '') {
        if (!inputTextMeta.fieldName || String(inputTextMeta.fieldName).trim() === '') {
            throw new Error(CardViewModel.ErrorMessages.TEXT_INPUT_MISSING_FIELD_NAME_ERROR);
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
            throw new Error(CardViewModel.ErrorMessages.TEXT_BUTTON_MISSING_PROPERTIES_ERROR);
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
            throw new Error(CardViewModel.ErrorMessages.TEXT_BUTTON_MISSING_PROPERTIES_ERROR);
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
};

CardViewModel.ErrorMessages = {
    FIXED_FOOTER_BUTTON_NOT_DEFINED_ERROR: "Fixed footer must have a primaryButton defined.",
    TEXT_INPUT_MISSING_FIELD_NAME_ERROR: "TextInput widget must have a 'fieldName' property.",
    DECORATED_TEXT_MISSING_CONTENT_ERROR: "DecoratedText widget must have at least one of 'text', 'decoratedText', 'topLabel', or 'bottomLabel' properties defined.",
    TEXT_BUTTON_MISSING_PROPERTIES_ERROR: "TextButton widget must have either 'text', and 'openLink' or 'onClick' defined."
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = CardViewModel;
}